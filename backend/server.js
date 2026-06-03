// File: server.js
// Start: node server.js
// Env: GROQ_API_KEY=your_key
// Deps: npm i express groq-sdk
import 'dotenv/config';  // auto-loads .env variables

if (!process.env.GROQ_API_KEY) {
    console.error("FATAL ERROR: GROQ_API_KEY is not defined in the environment.");
    console.error("Please add GROQ_API_KEY to your backend/.env file.");
    process.exit(1);
}

import express from "express";
import bodyParser from "body-parser";
import Groq from "groq-sdk";
import Project from './models/projectModel.js';
import slugify from 'slugify';
import connectToDb from './utils/connectToDb.js';
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import User from './models/userModel.js';
import mongoose from 'mongoose';

import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(); // get current directory
const filePath = path.join(__dirname, 'mockdata.json');

const rawData = fs.readFileSync(filePath, 'utf-8');
const mockdata = JSON.parse(rawData);


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// cors setup
app.use(
    cors({
        origin: "http://localhost:5173",   // frontend URL
        credentials: true,                 // allow cookies/session
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());

// connect to mongo db
await connectToDb(process.env.MONGO_DB_URL);

// Setup session middleware
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google OAuth Strategy (using dummy fallbacks if environment variables are missing to avoid startup crash)
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            // saves user to data base
            try {
                // check if user exists
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // create new user
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        picture: profile.photos[0].value, // profile image from Google
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// Routes
app.get("/", (req, res) => {
    // console.log(req.user)
    return res.json({ message: `Hello from backend server running on port : ${process.env.PORT}`, current_user: req.user })
})

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Redirect frontend with user session
        res.redirect("http://localhost:5173/dashboard");
    }
);

app.get("/api/current_user", (req, res) => {
    // console.log(req.user)
    if (req.user) {
        res.json({ user: req.user, authenticated: true });
    } else {
        res.json({ message: "No user logged in", authenticated: false });
    }
})

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173/");
    });
});


const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const MAX_ROUNDS = Number(process.env.MAX_ROUNDS || 3);
const HARD_TIME_LIMIT_MS = Number(process.env.TIME_LIMIT_MS || 120_000);
const TEMPERATURE = Number(process.env.TEMPERATURE || 0.6);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ---------- Normalizers & helpers ----------
const defaultAgentResponse = {
    agent: "",               // agent name
    feedback: "",            // plain text
    risks: [],               // array of strings
    suggestions: [],         // array of strings
    refinedRequirement: "",  // short string
    raw: ""                  // raw model text fallback
};

const defaultJudgeResponse = {
    refinedSpec: {           // keep this an object for frontend stability
        title: "",
        summary: "",
        features: [],
        acceptanceCriteria: [],
        nonFunctional: {},
        scope: { inScope: [], outOfScope: [] },
        milestones: []
    },
    changeLog: [],           // array of strings
    risks: [],               // array of {id, description, severity, mitigation} or strings
    consensusMap: {}         // { AgentName: "approved" | "rejected" | ... }
};

function extractJsonBlock(text) {
    if (!text || typeof text !== "string") return null;
    // Try fenced JSON first
    const fenceMatch = text.match(/```(?:json\\n)?([\\s\\S]*?)```/i);
    if (fenceMatch && fenceMatch[1]) return fenceMatch[1].trim();
    // Fallback: first { .. last }
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) return text.slice(first, last + 1);
    return null;
}

function safeParseJson(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        return null;
    }
}

function normalizeAgentOutput(parsed, rawText, agentName) {
    if (!parsed) {
        return { ...defaultAgentResponse, agent: agentName, feedback: (rawText || "").slice(0, 1000), raw: rawText };
    }
    return {
        agent: parsed.agent || agentName,
        feedback: typeof parsed.feedback === "string" ? parsed.feedback : (parsed.comment || parsed.notes || ""),
        risks: Array.isArray(parsed.risks) ? parsed.risks : (parsed.risk ? [parsed.risk] : []),
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : (parsed.actions ? parsed.actions : []),
        refinedRequirement: parsed.refinedRequirement || parsed.refinedRequirementText || parsed.refined || "",
        raw: rawText
    };
}

function normalizeJudgeOutput(parsed, rawText, priorSummary = null) {
    if (!parsed) {
        // fallback: try to use rawText string as summary
        const fallbackSummary = (rawText || "").slice(0, 1000);
        return { ...defaultJudgeResponse, refinedSpec: { ...defaultJudgeResponse.refinedSpec, summary: fallbackSummary } };
    }

    // Ensure refinedSpec is an object
    let refinedSpec = {};
    if (typeof parsed.refinedSpec === "string") {
        refinedSpec = { ...defaultJudgeResponse.refinedSpec, summary: parsed.refinedSpec };
    } else if (typeof parsed.refinedSpec === "object" && parsed.refinedSpec !== null) {
        refinedSpec = {
            ...defaultJudgeResponse.refinedSpec,
            title: parsed.refinedSpec.title || defaultJudgeResponse.refinedSpec.title,
            summary: parsed.refinedSpec.summary || parsed.refinedSpec.description || "",
            features: Array.isArray(parsed.refinedSpec.features) ? parsed.refinedSpec.features : (parsed.features || []),
            acceptanceCriteria: Array.isArray(parsed.refinedSpec.acceptanceCriteria) ? parsed.refinedSpec.acceptanceCriteria : (parsed.acceptanceCriteria || []),
            nonFunctional: parsed.refinedSpec.nonFunctional || parsed.nonFunctional || defaultJudgeResponse.refinedSpec.nonFunctional,
            scope: parsed.refinedSpec.scope || parsed.scope || defaultJudgeResponse.refinedSpec.scope,
            milestones: Array.isArray(parsed.refinedSpec.milestones) ? parsed.refinedSpec.milestones : (parsed.milestones || [])
        };
    } else {
        refinedSpec = { ...defaultJudgeResponse.refinedSpec };
    }

    const changeLog = Array.isArray(parsed.changeLog) ? parsed.changeLog : (parsed.changes || []);
    const risks = Array.isArray(parsed.risks) ? parsed.risks : (parsed.riskList || []);
    const consensusMap = (parsed.consensusMap && typeof parsed.consensusMap === "object") ? parsed.consensusMap : (parsed.consensus || {});

    return { refinedSpec, changeLog, risks, consensusMap };
}


function callWithRetry(fn, { retries = 2, baseDelay = 500 } = {}) {
    return new Promise(async (resolve, reject) => {
        let lastErr;
        for (let i = 0; i <= retries; i++) {
            try {
                return resolve(await fn());
            } catch (err) {
                lastErr = err;
                if (i < retries)
                    await new Promise((r) => setTimeout(r, baseDelay * (i + 1)));
            }
        }
        reject(lastErr);
    });
}

const AGENTS = [
    {
        name: "Project Manager",
        system: `You are a seasoned Product/Project Manager. Your goal is to clarify scope, dependencies, risks, and success metrics. Use bullet points.`,
    },
    {
        name: "Designer",
        system: `You are a pragmatic Product Designer. Focus on user journeys, accessibility, and simple wireframe notes in text.`,
    },
    {
        name: "Developer",
        system: `You are a Senior Developer. Identify architecture, APIs, data model hints, edge cases, and testing strategy.`,
    },
    {
        name: "Market Analyst",
        system: `You are a Market & Competitor Analyst. Identify target segments, benchmarks, differentiators, and KPIs.`,
    },
];

const JUDGE = {
    name: "Judge",
    system: `You are the impartial Judge. Input: requirement + agents' notes. Task: (1) Resolve conflicts; (2) Produce refined requirement spec with sections; (3) Produce a change log and short risk register; (4) Track consensus. Output JSON only with {refinedSpec, changeLog, risks, consensusMap}.`,
};

async function runRound({ groq, round, initialRequirement, priorSummary }) {
    const roundTag = `Round ${round}`;

    // 1) Ask each agent for a JSON response (strict schema)
    const agentResults = await Promise.all(
        AGENTS.map(async (agent) => {
            const agentPrompt = (round === 1 && priorSummary !== null) ? [
                `${roundTag} — You are the ${agent.name}.`,
                `Feedback from user: """${initialRequirement}"""`,
                priorSummary ? `Prior Judge summary: ${priorSummary.refinedSpec.slice(0, 2000)}` : "",
                `REPLY ONLY in JSON (no explanation). Use exactly this schema:\n{\n  "agent": "${agent.name}",\n  "feedback": "short plain text feedback",\n  "risks": [\"risk 1\", \"risk 2\"],\n  "suggestions": [\"improvement 1\", \"improvement 2\"],\n  "refinedRequirement": "one-line refined requirement"\n}`
            ].filter(Boolean).join("\n\n") : [
                `${roundTag} — You are the ${agent.name}.`,
                `Initial requirement: """${initialRequirement}"""`,
                priorSummary ? `Prior Judge summary: ${JSON.stringify(priorSummary.refinedSpec).slice(0, 2000)}` : "",
                `REPLY ONLY in JSON (no explanation). Use exactly this schema:\n{\n  "agent": "${agent.name}",\n  "feedback": "short plain text feedback",\n  "risks": [\"risk 1\", \"risk 2\"],\n  "suggestions": [\"improvement 1\", \"improvement 2\"],\n  "refinedRequirement": "one-line refined requirement"\n}`
            ].filter(Boolean).join("\n\n");

            const chatCompletion = await callWithRetry(() => groq.chat.completions.create({
                messages: [
                    { role: "system", content: agent.system },
                    { role: "user", content: agentPrompt }
                ],
                model: GROQ_MODEL,
                temperature: TEMPERATURE,
                response_format: { type: "json_object" }
            }));
            const raw = chatCompletion.choices[0].message.content;

            // Parse & normalize agent response
            const jsonBlock = extractJsonBlock(raw);
            const parsed = jsonBlock ? safeParseJson(jsonBlock) : safeParseJson(raw);
            const normalized = normalizeAgentOutput(parsed, raw, agent.name);
            return normalized;
        })
    );

    // 2) Call Judge with normalized agentResults
    const judgePrompt = [
        `${roundTag} — Aggregate & decide.`,
        `Initial requirement: """${initialRequirement}"""`,
        priorSummary ? `Prior summary JSON: ${JSON.stringify(priorSummary).slice(0, 4000)}` : "",
        `AgentNotes (JSON array): ${JSON.stringify(agentResults).slice(0, 12000)}`,
        `REPLY ONLY in JSON using exactly this schema:\n{\n  "refinedSpec": { "title": "", "summary": "", "features": [], "acceptanceCriteria": [], "nonFunctional": {}, "scope": {"inScope": [], "outOfScope": []}, "milestones": [] },\n  "changeLog": [\"string\"],\n  "risks": [ { \"id\":\"R1\", \"description\":\"\", \"severity\":\"\", \"mitigation\":\"\" } ],\n  "consensusMap": { \"AgentName\": \"approved\" }\n}`
    ].filter(Boolean).join("\n\n");

    const judgeCompletion = await callWithRetry(() => groq.chat.completions.create({
        messages: [
            { role: "system", content: JUDGE.system },
            { role: "user", content: judgePrompt }
        ],
        model: GROQ_MODEL,
        temperature: TEMPERATURE,
        response_format: { type: "json_object" }
    }));
    const judgeRaw = judgeCompletion.choices[0].message.content;

    // Parse & normalize judge output
    const judgeJsonBlock = extractJsonBlock(judgeRaw);
    const judgeParsed = judgeJsonBlock ? safeParseJson(judgeJsonBlock) : safeParseJson(judgeRaw);
    const normalizedJudge = normalizeJudgeOutput(judgeParsed, judgeRaw, priorSummary);

    return { agentNotes: agentResults, judge: normalizedJudge, rawJudge: judgeRaw };
}

app.get("/api/user_projects", async (req, res) => {
    // console.log(req.user,"User from req")
    if (!req.user) {
        return res.json({ error: "user not authenticted" })
    }
    const { _id } = req.user;

    const projects = await Project.find({
        createdBy: _id
    })
    return res.json(projects);
})

app.get("/api/get_project/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        // console.log("Paramssssssssssss" , projectId)

        const id = projectId.toString();

        // Validate before using it
        // if (!mongoose.Types.ObjectId.isValid(projectId)) {
        //     return res.status(400).json({ message: "Invalid project ID" });
        // }

        const projectData = await Project.findOne({_id: id}); // pass directly
        if (!projectData) {
            return res.status(404).json({ message: "No project found" });
        }

        return res.json(projectData);
    } catch (err) {
        console.error("Error fetching project:", err);
        return res.status(500).json({ error: err.message });
    }
})

app.delete("/api/delete_project/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized. Please log in first." });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }

        if (project.createdBy && project.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Forbidden. You can only delete your own projects." });
        }

        await Project.findByIdAndDelete(projectId);
        return res.json({ message: "Project deleted successfully." });
    } catch (err) {
        console.error("Error deleting project:", err);
        return res.status(500).json({ error: "Failed to delete project.", details: err.message });
    }
})

function formatGroqError(err) {
    const msg = String(err?.message || err);
    const status = err?.status || err?.statusCode || (err?.response && err?.response?.status);
    
    if (status === 401 || msg.includes("401") || msg.includes("API key") || msg.includes("invalid_api_key") || msg.includes("Unauthorized")) {
        return "Invalid Groq API Key. Make sure that the GROQ_API_KEY in your backend/.env is a valid, active API key from the Groq Console.";
    }
    if (status === 429 || msg.includes("429") || msg.includes("rate_limit_exceeded") || msg.includes("Rate limit")) {
        return "Groq API Rate Limit Exceeded (429). Please check your Groq account limits or try again later.";
    }
    return `Groq API Error: ${msg}`;
}

app.post("/feedback", async (req, res) => {
    const { feedback, priorContext, projectId } = req.body;
    if (!feedback) return res.status(400).json({ error: "Missing requirement" });

    try {
        const started = Date.now();
        let priorSummary = priorContext;
        const transcript = [];

        for (let round = 1; round <= MAX_ROUNDS; round++) {
            if (Date.now() - started > HARD_TIME_LIMIT_MS) break;
            const { agentNotes, judge } = await runRound({
                groq,
                round,
                initialRequirement: feedback,
                priorSummary,
            });
            transcript.push({ round, agentNotes, judge });
            priorSummary = judge;
        }

        const feedbackStrings = transcript[transcript.length - 1].agentNotes.map(element => {
            return { agent: element.agent, feedback: element.feedback }
        });

        const riskStrings = priorSummary.risks.map(risk => {
            return typeof risk === 'object' ? (risk.description || risk.text || JSON.stringify(risk)) : risk;
        });

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                title: priorSummary.refinedSpec.title,
                slug: slugify(priorSummary.refinedSpec.title, { lower: true }),
                createdBy: req.user?._id || null,
                feedback: feedbackStrings,
                judge: {
                    refinedSpec: priorSummary.refinedSpec,
                    changeLog: priorSummary.changeLog,
                    risks: riskStrings,
                    consensusMap: priorSummary.consensusMap
                }
            },
            { new: true, runValidators: true }
        );

        if (updatedProject) {
            console.log("Data updated for this project in DB successfully")
        }

        return res.json({
            projectId: updatedProject._id,
            startedAt: new Date(started).toISOString(),
            rounds: transcript.length,
            model: GROQ_MODEL,
            initialRequirement: feedback,
            final: priorSummary,
            transcript,
        });
    } catch (err) {
        console.error("Error in real feedback refinement:", err);
        const friendlyMsg = formatGroqError(err);
        return res.status(500).json({ error: "Feedback refinement failed", details: friendlyMsg });
    }
});


app.post("/refine", async (req, res) => {
    const { requirement } = req.body;
    if (!requirement) return res.status(400).json({ error: "Missing requirement" });

    try {
        const started = Date.now();
        let priorSummary = null;
        const transcript = [];

        for (let round = 1; round <= MAX_ROUNDS; round++) {
            if (Date.now() - started > HARD_TIME_LIMIT_MS) break;
            const { agentNotes, judge } = await runRound({
                groq,
                round,
                initialRequirement: requirement,
                priorSummary,
            });
            transcript.push({ round, agentNotes, judge });
            priorSummary = judge;
        }

        const feedbackStrings = transcript[transcript.length - 1].agentNotes.map(element => {
            return { agent: element.agent, feedback: element.feedback }
        });

        const riskStrings = priorSummary.risks.map(risk => {
            return typeof risk === 'object' ? (risk.description || risk.text || JSON.stringify(risk)) : risk;
        });

        const newProject = await Project.create({
            title: priorSummary.refinedSpec.title,
            slug: slugify(priorSummary.refinedSpec.title, { lower: true }),
            createdBy: req.user?._id || null,
            requirement: requirement,
            feedback: feedbackStrings,
            judge: {
                refinedSpec: priorSummary.refinedSpec,
                changeLog: priorSummary.changeLog,
                risks: riskStrings,
                consensusMap: priorSummary.consensusMap
            }
        });

        if (newProject) {
            console.log("Data saved to DB successfully")
        }

        return res.json({
            projectId: newProject._id,
            startedAt: new Date(started).toISOString(),
            rounds: transcript.length,
            model: GROQ_MODEL,
            initialRequirement: requirement,
            final: priorSummary,
            transcript,
        });
    } catch (err) {
        console.error("Error in real refinement:", err);
        const friendlyMsg = formatGroqError(err);
        return res.status(500).json({ error: "Refinement process failed", details: friendlyMsg });
    }
});

app.listen(3000, () => console.log(`🚀 API running at http://localhost:${process.env.PORT}`));