import React, { useState, useEffect } from 'react';
import RefinedOutput from '../components/RefinedOutput';
import DownloadPDF from '../components/downloadBtn';
import { useNavigate } from "react-router-dom";
import { Send, BarChart2, GitPullRequest, Bot, AlertTriangle, Loader2 } from 'lucide-react';

function Refine() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Project Manager", desc: "Structuring requirements, setting milestones and PM scope..." },
    { title: "Product Designer", desc: "Sketching user interfaces, mapping journeys, and detailing layouts..." },
    { title: "Engineering Lead", desc: "Evaluating technical stack, database design, and architecture..." },
    { title: "Market Analyst", desc: "Benchmarking competitive positioning and analyzing user KPIs..." },
    { title: "Impartial Judge", desc: "Consolidating virtual team feedback and synthesizing the final PRD spec..." }
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setCurrentStep(0);
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 3000);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiBase}/refine`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requirement: input }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to refine requirement');
      }

      setOutput(data.final);
      setData(data);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Error refining requirement. Please check your configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-zinc-900 selection:bg-zinc-950 selection:text-white">
      {/* Workspace Header */}
      <div className="border-b border-zinc-200 bg-white py-4 px-8 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono text-zinc-400">Workspace / Creator</span>
          <h1 className="text-sm font-semibold text-zinc-900 mt-0.5">Requirements Refinement Studio</h1>
        </div>
      </div>

      {/* Split-pane Workspace */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-125px)]">
        {/* Left Pane - Input & Configuration */}
        <div className="w-full lg:w-[450px] bg-zinc-50 border-r border-zinc-200 p-8 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Project Requirement Prompt
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your project idea in detail (e.g. 'A telemedicine app with scheduling, chat, and prescriptions...')"
                className="w-full border border-zinc-200 rounded-xl p-4 bg-white text-zinc-900 text-sm font-medium
                     placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 focus:border-zinc-500 shadow-sm resize-none"
                rows={10}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-850 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Brainstorming...
                </>
              ) : (
                <>
                  Refine Requirement
                  <Send size={14} />
                </>
              )}
            </button>
          </form>

          <div className="border-t border-zinc-200 pt-6 mt-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">Workspace Guidelines</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Virtual specialists collaborate on PM, Design, Tech, and Marketing scopes. The Judge reconciles conflicts and updates a structured specification.
            </p>
          </div>
        </div>

        {/* Right Pane - Live Timeline or Output */}
        <div className="flex-1 bg-white p-8 md:p-12 flex flex-col">
          {/* Case 1: Idle (Not loading, no output) */}
          {!loading && !output && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="h-10 w-10 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4">
                <Bot size={20} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900">Workspace Idle</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Provide your requirements in the control panel on the left and click \"Refine Requirement\" to launch the virtual studio.
              </p>
            </div>
          )}

          {/* Case 2: Loading State (Live refinement timeline) */}
          {loading && (
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-10">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin text-blue-600" />
                  Virtual Studio is actively collaborating
                </h3>
                <p className="text-xs text-zinc-500 mt-1">AI specialists are analyzing and debating in the background...</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-100 rounded-full h-1.5 mb-8">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              {/* Steps timeline */}
              <div className="relative border-l border-zinc-200 ml-3.5 space-y-6">
                {steps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;
                  return (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 
                        ${isCompleted ? 'bg-zinc-800 border-zinc-800' : 
                          isActive ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100' : 'bg-white border-zinc-300'}`} 
                      />
                      <h4 className={`text-sm font-semibold ${isActive ? 'text-blue-600' : 'text-zinc-800'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Case 3: Error Occurred */}
          {error && (
            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center">
              <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4 animate-bounce">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900">Refinement Error</h3>
              <p className="text-xs text-red-600 mt-2 bg-red-50 border border-red-100 p-4 rounded-lg leading-relaxed text-left font-mono">
                {error}
              </p>
              <button 
                onClick={() => setError('')} 
                className="mt-6 border border-zinc-300 hover:bg-zinc-50 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Clear Error
              </button>
            </div>
          )}

          {/* Case 4: Output Received */}
          {!loading && output && (
            <div className="flex-1 flex flex-col">
              {/* Output Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 pb-5 mb-8 gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                    PRD Generated
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">ID: {data.projectId}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <DownloadPDF data={output} />
                  <button
                    onClick={() => navigate("/analytics", { state: { data } })}
                    className="inline-flex items-center gap-1 border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    <BarChart2 size={12} />
                    Go to Analytics
                  </button>
                  <button
                    onClick={() => navigate("/workflow", { state: { data } })}
                    className="inline-flex items-center gap-1 border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    <GitPullRequest size={12} />
                    Workflow Details
                  </button>
                </div>
              </div>

              {/* The Specification Document */}
              <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full">
                <RefinedOutput data={output} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Refine;
