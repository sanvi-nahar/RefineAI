import React from "react";
import { List, CheckSquare, Layers, HelpCircle, Calendar, Shield } from "lucide-react";

const SectionCard = ({ title, icon, children }) => (
    <div className="mb-8">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2 mb-3">
            {icon}
            {title}
        </h2>
        <div className="pl-6">
            {children}
        </div>
    </div>
);

export default function RefinedOutput({ data }) {
    // Safety guard to prevent rendering crashes
    if (!data || typeof data !== "object" || !data.refinedSpec) {
        return (
            <div className="max-w-xl mx-auto my-8 p-6 bg-red-50 border border-red-150 rounded-xl text-center text-zinc-900 shadow-sm">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-sm font-semibold mt-2 text-red-900">Refinement Data Error</h2>
                <p className="text-red-700 mt-2 text-xs font-mono leading-relaxed">
                    {typeof data === "string" ? data : "Failed to load refined specifications. Please check your API key configuration and database connectivity."}
                </p>
            </div>
        );
    }

    const { refinedSpec } = data;

    return (
        <div className="max-w-3xl mx-auto bg-white font-sans text-zinc-800 leading-relaxed">
            {/* Header */}
            <header className="mb-10 pb-8 border-b border-zinc-200">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 mb-3">
                    {refinedSpec.title || data.title || "Refined Specification"}
                </h1>
                <p className="text-base text-zinc-500 max-w-2xl leading-relaxed">
                    {refinedSpec.summary || data.summary || ""}
                </p>
            </header>

            {/* Scope */}
            {refinedSpec.scope && (refinedSpec.scope.inScope || refinedSpec.scope.outOfScope) && (
                <SectionCard title="Scope Boundaries" icon={<Layers size={16} className="text-zinc-400" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-2 font-semibold">In Scope</h3>
                            <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-600">
                                {(refinedSpec.scope.inScope || []).map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-rose-700 mb-2 font-semibold">Out of Scope</h3>
                            <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-600">
                                {(refinedSpec.scope.outOfScope || []).map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>
                </SectionCard>
            )}

            {/* Features */}
            {refinedSpec.features && refinedSpec.features.length > 0 && (
                <SectionCard title="Key Capabilities & Features" icon={<List size={16} className="text-zinc-400" />}>
                    <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600">
                        {refinedSpec.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </SectionCard>
            )}

            {/* Acceptance Criteria */}
            {refinedSpec.acceptanceCriteria && refinedSpec.acceptanceCriteria.length > 0 && (
                <SectionCard title="Acceptance Criteria" icon={<CheckSquare size={16} className="text-zinc-400" />}>
                    <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600">
                        {refinedSpec.acceptanceCriteria.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </SectionCard>
            )}

            {/* Non-functional */}
            {refinedSpec.nonFunctional && Object.keys(refinedSpec.nonFunctional).length > 0 && (
                <SectionCard title="Non-Functional Requirements" icon={<Shield size={16} className="text-zinc-400" />}>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2.5 text-xs text-zinc-600">
                        {Object.entries(refinedSpec.nonFunctional).map(([k, v]) => (
                            <p key={k}>
                                <span className="font-semibold text-zinc-900 capitalize font-mono mr-1">{k}:</span> 
                                {v}
                            </p>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* Milestones */}
            {refinedSpec.milestones && refinedSpec.milestones.length > 0 && (
                <SectionCard title="Development Milestones" icon={<Calendar size={16} className="text-zinc-400" />}>
                    <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600">
                        {refinedSpec.milestones.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </SectionCard>
            )}
        </div>
    );
}
