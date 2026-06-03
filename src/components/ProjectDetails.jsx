import React, { useEffect, useState } from "react";
import RefinedOutput from "./RefinedOutput";
import { formatReadableDate } from "../utils/formatTime";
import { GitCommit, ShieldAlert, MessageSquare, Calendar, ChevronRight } from "lucide-react";

const ProjectPage = ({ data }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    setProject(data);
    console.log(data);
  }, [data]);

  if (!project) return <p className="text-center text-zinc-500 mt-10 font-mono text-xs">Loading workspace...</p>;

  // Normalize risks format
  const riskList = project.judge?.risks || [];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 py-12 px-6 font-sans selection:bg-zinc-950 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumbs / Back button */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <a href="/dashboard" className="hover:text-zinc-600 transition-colors">Workspace</a>
          <ChevronRight size={12} />
          <span className="text-zinc-600">Project Details</span>
        </div>

        {/* Project Header details */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-mono text-zinc-400">Specification Overview</span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1.5 mb-3">
            {project.title || "Untitled Specification"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-zinc-500 bg-zinc-50 border border-zinc-100 p-4 rounded-xl">
            <p><span className="text-zinc-400">Project ID:</span> {project._id}</p>
            <p><span className="text-zinc-400">Slug:</span> {project.slug}</p>
            <p className="md:col-span-2 mt-1">
              <span className="text-zinc-400">Raw Concept:</span> "{project.requirement}"
            </p>
          </div>
          <p className="mt-4 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Calendar size={12} />
            Created on {new Date(project.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Main Refined Output Specification */}
        {project.judge?.refinedSpec && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <RefinedOutput data={project.judge} />
          </div>
        )}

        {/* Change Log & Risks */}
        {project.judge && ((project.judge.changeLog && project.judge.changeLog.length > 0) || (riskList.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Change Log */}
            {project.judge.changeLog && project.judge.changeLog.length > 0 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
                  <GitCommit size={14} className="text-zinc-400" />
                  Revision Log
                </h3>
                <ul className="space-y-2 text-xs text-zinc-600 font-mono leading-relaxed">
                  {project.judge.changeLog.map((log, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-blue-500">•</span>
                      <span>{log}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risk Log */}
            {riskList.length > 0 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
                  <ShieldAlert size={14} className="text-zinc-400" />
                  Identified Risks
                </h3>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  {riskList.map((risk, i) => {
                    const desc = typeof risk === 'object' ? (risk.description || JSON.stringify(risk)) : risk;
                    return (
                      <li key={i} className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-rose-800 leading-relaxed font-mono text-[11px]">
                        {desc}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Feedback Section */}
        {project.feedback && project.feedback.length > 0 && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
              <MessageSquare size={14} className="text-zinc-400" />
              Specialist Discussions
            </h3>
            <div className="space-y-4">
              {project.feedback.map((f, index) => (
                <div
                  key={index}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700"
                >
                  <p className="leading-relaxed font-medium">{f.feedback || f.text || "No feedback text"}</p>
                  {(f.agent || f.author) && (
                    <p className="text-[10px] font-mono text-zinc-400 mt-2">— {f.agent || f.author}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
