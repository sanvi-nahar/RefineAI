import React from "react";
import { Clock, Bot, ChartColumn, MessageSquare, Users, Zap, Check, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-zinc-900 font-sans overflow-x-hidden selection:bg-zinc-950 selection:text-white">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-800 mb-8">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Product Studio v2.0
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
            Refine your requirements with <br />
            <span className="text-blue-600">collaborative AI virtual teams</span>
          </h1>
          
          <p className="mt-6 text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Submit your initial concept and watch virtual specialists debate, refine scope, analyze market positioning, and synthesize a crystal-clear product specification.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-zinc-850 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-colors"
            >
              Get Started for Free
              <ChevronRight size={16} />
            </a>
            <a
              href="/about"
              className="inline-flex items-center border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 border-t border-zinc-200">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Built for product teams</h2>
            <p className="mt-4 text-zinc-500">A structured workspace that aligns virtual specialists for rapid drafting and consensus.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot size={24} className="text-zinc-700" />,
                title: "Structured Discussion",
                desc: "AI virtual specialists debate requirements across rounds to cover scope, design, tech feasibility, and market fit.",
              },
              {
                icon: <MessageSquare size={24} className="text-zinc-700" />,
                title: "Live Refinement",
                desc: "Watch PMs, Designers, and Tech Architects collaborate in real-time to challenge and improve your inputs.",
              },
              {
                icon: <ChartColumn size={24} className="text-zinc-700" />,
                title: "Aggregated Insights",
                desc: "A neutral judge reconciles conflicting suggestions, building structured change logs and actionable specs.",
              },
              {
                icon: <Clock size={24} className="text-zinc-700" />,
                title: "Rapid Iterations",
                desc: "Iterative debates run in under a minute, delivering structured PRDs and user stories instantly.",
              },
              {
                icon: <Users size={24} className="text-zinc-700" />,
                title: "Collaborative Interface",
                desc: "Review past specifications, trace revisions, and update documents with live feedback in the dashboard.",
              },
              {
                icon: <Zap size={24} className="text-zinc-700" />,
                title: "Figma & Linear Quality",
                desc: "Receive perfectly structured specifications including milestones, acceptance criteria, and technical designs.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-200 rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-zinc-50 border border-zinc-200 mb-6">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* virtual team section */}
        <section className="py-24 border-t border-zinc-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Virtual Specialists</h2>
            <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
              Our pre-configured roles analyze requirements from multiple angles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { title: "Project Manager", desc: "Defines scope, milestones, and success metrics." },
              { title: "Engineering Lead", desc: "Outlines architecture, database schemas, and tech constraints." },
              { title: "Product Designer", desc: "Shapes user journeys, access flows, and UI wireframes." },
              { title: "Market Analyst", desc: "Benchmarks competitors, segments target audience, and sets KPIs." },
              { title: "Synthesized Judge", desc: "Resolves conflicting notes and compiles the final product PRD." },
            ].map((agent, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <span className="text-xs font-mono text-zinc-400">0{i + 1} // Role</span>
                <h3 className="text-base font-semibold text-zinc-900 mt-2 mb-2">{agent.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 border-t border-zinc-200">
          <div className="bg-zinc-900 text-white rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight">Ready to build your spec?</h2>
              <p className="mt-4 text-zinc-400">
                Join product managers and engineering leads already using Refine AI to draft, align, and refine requirements in minutes.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check size={16} className="text-blue-500" /> 10x faster requirement refinement
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check size={16} className="text-blue-500" /> Export final PDF directly to your team
                </li>
              </ul>
            </div>

            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 w-full md:w-80 flex flex-col gap-4">
              <h3 className="text-lg font-bold">Start Free Today</h3>
              <p className="text-xs text-zinc-400">No credit card required. Get setup in minutes.</p>
              <a
                href="/signup"
                className="bg-white text-zinc-950 hover:bg-zinc-100 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm animate-pulse"
              >
                Create Free Account
              </a>
              <span className="text-[10px] text-zinc-500 text-center">
                Includes 14-day trial & full dashboard access.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}