import React, { useEffect } from "react";

const SectionCard = ({ title, children }) => (
    <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">{title}</h2>
        {children}
    </div>
);

export default function RefinedOutput({ data }) {
    useEffect(() => {
        if (data) {
            console.log("refined Data fetched from backend")
        } else {
            console.log("refined Data not found")
        }
    }, [data]);

    // Safety guard to prevent rendering crashes if the server returns an error string or invalid structure
    if (!data || typeof data !== "object" || !data.refinedSpec) {
        return (
            <div className="max-w-xl mx-auto my-8 p-6 bg-red-950/40 border border-red-500/40 rounded-2xl shadow-lg text-center text-white">
                <span className="text-3xl">⚠️</span>
                <h2 className="text-xl font-bold mt-2 text-red-300">Refinement Error</h2>
                <p className="text-gray-300 mt-2 text-sm">
                    {typeof data === "string" ? data : "Failed to load refined specifications. Please check your Gemini API key configuration and database connectivity."}
                </p>
            </div>
        );
    }

    const { refinedSpec } = data;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-black rounded-md">
            {/* Header */}
            <div className="bg-gray-950 p-6 rounded-2xl shadow-lg border border-purple-500/30 
                hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition duration-300">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text 
                   bg-gradient-to-r from-blue-900 via-purple-500 to-blue-900 
                   drop-shadow-[0_0_18px_rgba(168,85,247,0.8)]">
                        {refinedSpec.title || data.title || "Refined Spec"}
                    </h1>
                    <p className="text-purple-200/90 text-lg drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]">
                        {refinedSpec.summary || data.summary || ""}
                    </p>
                </div>
            </div>

            {/* Features */}
            {refinedSpec.features && refinedSpec.features.length > 0 && (
                <SectionCard title="Features">
                    <ul className="list-disc pl-5 space-y-1">
                        {refinedSpec.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </SectionCard>
            )}

            {/* Acceptance Criteria */}
            {refinedSpec.acceptanceCriteria && refinedSpec.acceptanceCriteria.length > 0 && (
                <SectionCard title="Acceptance Criteria">
                    <ul className="list-disc pl-5 space-y-1">
                        {refinedSpec.acceptanceCriteria.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </SectionCard>
            )}

            {/* Non-functional */}
            {refinedSpec.nonFunctional && Object.keys(refinedSpec.nonFunctional).length > 0 && (
                <SectionCard title="Non-Functional Requirements">
                    {Object.entries(refinedSpec.nonFunctional).map(([k, v]) => (
                        <p key={k}><span className="font-semibold capitalize">{k}:</span> {v}</p>
                    ))}
                </SectionCard>
            )}

            {/* Scope */}
            {refinedSpec.scope && (refinedSpec.scope.inScope || refinedSpec.scope.outOfScope) && (
                <SectionCard title="Scope">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">In Scope</h3>
                            <ul className="list-disc pl-5">
                                {(refinedSpec.scope.inScope || []).map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">Out of Scope</h3>
                            <ul className="list-disc pl-5">
                                {(refinedSpec.scope.outOfScope || []).map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>
                </SectionCard>
            )}

            {/* Milestones */}
            {refinedSpec.milestones && refinedSpec.milestones.length > 0 && (
                <SectionCard title="Milestones">
                    <ul className="list-disc pl-5 space-y-1">
                        {refinedSpec.milestones.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </SectionCard>
            )}
        </div>
    );
}
