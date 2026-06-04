import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { ChevronLeft, Info, Calendar, Cpu, Layers } from "lucide-react";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

export default function Analytics() {
    const location = useLocation();
    const data = location.state?.data;
    const isDynamic = !!(data && data.transcript && data.transcript.length > 0);

    // Dynamic extraction of agents or fallback
    const agents = isDynamic
        ? data.transcript[data.transcript.length - 1].agentNotes.map(a => a.agent)
        : ["Project Manager", "Product Designer", "Engineering Lead", "Market Analyst"];

    // Dynamic risks count per agent
    const risksCount = isDynamic
        ? agents.map(agentName => {
              return data.transcript.reduce((sum, round) => {
                  const note = round.agentNotes.find(n => n.agent === agentName);
                  return sum + (note?.risks?.length || 0);
              }, 0);
          })
        : [3, 5, 2, 4];

    // Dynamic suggestions count
    const suggestions = isDynamic
        ? agents.map(agentName => {
              return data.transcript.reduce((sum, round) => {
                  const note = round.agentNotes.find(n => n.agent === agentName);
                  return sum + (note?.suggestions?.length || 0);
              }, 0);
          })
        : [8, 12, 6, 9];

    // Active rounds counts
    const rounds = isDynamic
        ? agents.map(agentName => {
              return data.transcript.filter(round => {
                  const note = round.agentNotes.find(n => n.agent === agentName);
                  return note && ((note.suggestions?.length || 0) > 0 || (note.feedback?.length || 0) > 10);
              }).length;
          })
        : [3, 3, 3, 3];

    // Contributions based on characters typed
    const contributions = isDynamic
        ? (() => {
              const lengths = agents.map(agentName => {
                  return data.transcript.reduce((sum, round) => {
                      const note = round.agentNotes.find(n => n.agent === agentName);
                      return sum + (note?.feedback?.length || 0);
                  }, 0);
              });
              const total = lengths.reduce((a, b) => a + b, 0) || 1;
              return lengths.map(len => Math.round((len / total) * 100));
          })()
        : [30, 25, 25, 20];

    // Dynamic feedback volume in characters
    const feedbackVolume = isDynamic
        ? agents.map(agentName => {
              return data.transcript.reduce((sum, round) => {
                  const note = round.agentNotes.find(n => n.agent === agentName);
                  return sum + (note?.feedback?.length || 0);
              }, 0);
          })
        : [1800, 1500, 2200, 1200];

    // Premium SaaS color palette: Zinc, blue, purple, emerald
    const colors = ["#18181b", "#2563eb", "#8b5cf6", "#10b981"];

    // Chart Data Configs
    const risksData = {
        labels: agents,
        datasets: [{ label: "Risks Identified", data: risksCount, backgroundColor: colors, borderRadius: 6 }],
    };

    const suggestionsData = {
        labels: agents,
        datasets: [
            {
                label: "Suggestions Contributed",
                data: suggestions,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.08)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "#2563eb",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#2563eb",
            },
        ],
    };

    const roundsData = {
        labels: agents,
        datasets: [{ data: rounds, backgroundColor: colors }],
    };

    const contributionsData = {
        labels: agents,
        datasets: [{ data: contributions, backgroundColor: colors }],
    };

    const feedbackVolumeData = {
        labels: agents,
        datasets: [{ label: "Feedback Volume (Characters)", data: feedbackVolume, backgroundColor: colors, borderRadius: 4 }],
    };

    // Chart Options configured for Zinc/Light Theme labels
    const chartOptions = {
        responsive: true,
        plugins: { 
            legend: { 
                labels: { 
                    color: "#27272a", // zinc-800
                    font: { family: "Inter", size: 11, weight: "500" }
                } 
            } 
        },
        scales: {
            y: { 
                ticks: { 
                    color: "#71717a", // zinc-500
                    font: { family: "JetBrains Mono", size: 10 }
                }, 
                grid: { color: "#e4e4e7" }, // zinc-200
                beginAtZero: true 
            },
            x: { 
                ticks: { 
                    color: "#71717a", // zinc-500
                    font: { family: "Inter", size: 11 }
                },
                grid: { display: false }
            },
        },
    };

    return (
        <div className="bg-[#fafafa] min-h-screen text-zinc-900 font-sans pb-16 selection:bg-zinc-950 selection:text-white">
            
            {/* Header / Navigation bar */}
            <div className="border-b border-zinc-200 bg-white py-4 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link to={isDynamic ? "/refine" : "/dashboard"} className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors border border-zinc-200 bg-white">
                        <ChevronLeft size={16} className="text-zinc-600" />
                    </Link>
                    <div>
                        <span className="text-xs font-mono text-zinc-400">Analytics / Performance</span>
                        <h1 className="text-sm font-semibold text-zinc-900 mt-0.5">Virtual Specialists Audit</h1>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
                
                {/* Fallback warning card if viewing static baseline */}
                {!isDynamic && (
                    <div className="bg-blue-50 border border-blue-150 rounded-xl p-4 flex gap-3 text-blue-900 max-w-3xl">
                        <Info className="shrink-0 text-blue-600 mt-0.5" size={16} />
                        <div className="text-xs font-medium">
                            <p className="font-semibold">Showing System Baseline Metrics</p>
                            <p className="text-blue-700/90 mt-0.5 leading-relaxed">
                                No active session transcript was detected. Navigate back to the Requirements Refinement Studio, refine a concept, and click "Go to Analytics" to load real-time agent consensus statistics.
                            </p>
                        </div>
                    </div>
                )}

                {/* Dynamic Session Metadata Overview */}
                {isDynamic && (
                    <section className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500">
                                <Layers size={16} />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Target Project</span>
                                <span className="text-xs font-semibold text-zinc-800 break-all">{data.final?.refinedSpec?.title || "Refined Spec"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500">
                                <Calendar size={16} />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Refinement Rounds</span>
                                <span className="text-xs font-semibold text-zinc-850 font-mono">{data.rounds || data.transcript.length} Rounds</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500">
                                <Cpu size={16} />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Orchestrator Model</span>
                                <span className="text-xs font-semibold text-zinc-850 font-mono">{data.model || "llama-3.3-70b"}</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Audit Grid */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl">
                    
                    {/* Risks Identified */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1 flex items-center gap-1.5">
                            Risks Identified by Specialists
                        </h2>
                        <p className="text-xs text-zinc-400 mb-6">Actual number of structural risks and concerns raised by each specialist</p>
                        <Bar data={risksData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
                    </div>

                    {/* Suggestions progression */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
                            Suggestions Contributed
                        </h2>
                        <p className="text-xs text-zinc-400 mb-6">Total design, technical, and scope revisions proposed</p>
                        <Line data={suggestionsData} options={chartOptions} />
                    </div>

                    {/* Rounds active */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
                            Rounds Active
                        </h2>
                        <p className="text-xs text-zinc-400 mb-6">Number of debate rounds where the agent contributed inputs</p>
                        <div className="max-w-[280px] mx-auto">
                            <Doughnut data={roundsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Character contribution share */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
                            Contribution Share (%)
                        </h2>
                        <p className="text-xs text-zinc-400 mb-6">Percentage share of total feedback notes provided</p>
                        <div className="max-w-[280px] mx-auto">
                            <Pie data={contributionsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Feedback Volume */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:col-span-2">
                        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
                            Analysis Feedback Volume (Characters)
                        </h2>
                        <p className="text-xs text-zinc-400 mb-6">Total character count of detailed feedback and notes written by each specialist</p>
                        <Bar
                            data={feedbackVolumeData}
                            options={{
                                ...chartOptions,
                                indexAxis: "y",
                                plugins: { legend: { display: false } }
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
