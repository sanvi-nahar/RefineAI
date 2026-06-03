import React from "react";

const Agents = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans pb-20">

      {/* Header */}
      <div className="p-6">
        <span className="bg-gray-800 text-sm px-3 py-1 rounded-full">Multi-Agent System</span>
      </div>

      {/* Title */}
      <div className="px-6">
        <h1 className="text-4xl font-bold">Agent's Description</h1>
        <p className="mt-3 text-gray-300 max-w-2xl">
          Meet the five agents that collaborate to refine product requirements. Each one tackles a
          different part of the problem so you move from vague idea to a signed-off PRD—fast.
        </p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <a href="/">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-200">
              Back to Home
            </button></a>
          
        </div>
      </div>

      {/* End-to-End Flow */}
      <div className="mt-10 px-6">
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-3">End-to-End Flow</h2>
          <div className="flex items-center space-x-2 text-gray-300 text-sm flex-wrap">
            <span className="px-2 py-1 bg-gray-700 rounded">Project Manager</span>
            <span>→</span>
            <span className="px-2 py-1 bg-gray-700 rounded">Designer</span>
            <span>→</span>
            <span className="px-2 py-1 bg-gray-700 rounded">Market Analyst</span>
            <span>→</span>
            <span className="px-2 py-1 bg-gray-700 rounded">Developer</span>
            <span>→</span>
            <span className="px-2 py-1 bg-gray-700 rounded">Synthesizer</span>
          </div>
          <p className="text-gray-400 mt-3 text-sm">
            Each handoff passes a richer artifact forward: brief → flows → scorecard → tech spec → PRD.
          </p>
        </div>
      </div>

      {/* Agents Section */}
      <div className="mt-12 px-6">
        <h2 className="text-2xl font-bold">Agents</h2>
        <p className="text-gray-400 mt-2">
          Problem-solving focused descriptions, responsibilities, and key challenges.
        </p>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          {/* Project Manager */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">📋 Project Manager</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Handoff → Designer</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Turns vague ideas into an actionable problem statement and a clear plan.
            </p>
            <h4 className="font-semibold">They solve</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
              <li>Requirements are fuzzy or conflicting</li>
              <li>Stakeholders disagree on priorities</li>
              <li>No clear acceptance criteria</li>
            </ul>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>Frame the objective, constraints, and success metrics</li>
              <li>Break work into milestones & orchestrate the agent handoffs</li>
              <li>Maintain a single source of truth (SoT) for the requirement</li>
            </ul>
          </div>

          {/* Designer */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">🎨 Designer</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Handoff → Market Analyst</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Explores solution options, user flows, and UX copy to satisfy the brief.
            </p>
            <h4 className="font-semibold">They solve</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
              <li>Unclear user journey</li>
              <li>Missing states/edge cases</li>
              <li>Inconsistent UX language</li>
            </ul>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>Wireframe core flows & states</li>
              <li>Define information architecture & UX copy</li>
              <li>Document accessibility considerations</li>
            </ul>
          </div>

          {/* Market Analyst */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">📊 Market Analyst</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Handoff → Developer</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Validates assumptions with market signals and competitive insight.
            </p>
            <h4 className="font-semibold">They solve</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
              <li>Unknown demand or willingness to pay</li>
              <li>No benchmark for success</li>
              <li>Blind spots vs. competitors</li>
            </ul>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>Summarize competitor approaches</li>
              <li>Estimate impact & effort (ICE/RICE)</li>
              <li>Identify leading indicators & guardrails</li>
            </ul>
          </div>

          {/* Developer */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">👨‍💻 Developer</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Handoff → Synthesizer</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Turns the refined requirement into technical specs and implementation notes.
            </p>
            <h4 className="font-semibold">They solve</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
              <li>Ambiguous API contracts</li>
              <li>Hidden edge cases & non-functional needs</li>
              <li>Security & performance gaps</li>
            </ul>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>Define data models & API contracts</li>
              <li>List non-functional requirements (NFRs)</li>
              <li>Outline testing strategy & telemetry</li>
            </ul>
          </div>

          {/* Synthesizer */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">🧠 Synthesizer</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Handoff →</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Merges outputs from all agents into a single, shippable requirement doc.
            </p>
            <h4 className="font-semibold">They solve</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
              <li>Siloed insights & duplication</li>
              <li>Missing acceptance tests across roles</li>
              <li>No clean handoff to delivery</li>
            </ul>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>Create the final PRD with traceability</li>
              <li>Highlight open questions & risks</li>
              <li>Generate acceptance tests & review checklist</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Agents;
