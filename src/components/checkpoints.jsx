import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

import pmImg from "../assets/pm.png";
import designerImg from "../assets/designer.png";
import developerImg from "../assets/developer.png";
import analystImg from "../assets/market-analyst.png";
import AgentCard from "./AgentCard";


const CheckpointRounds = () => {
    const location = useLocation();
    const data = location.state?.data;
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const agentImgConfig = [pmImg, designerImg, developerImg, analystImg];

    if (!data || !data.transcript) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">No Workflow Data</h2>
                <p className="text-gray-400">Please refine a requirement first to view rounds.</p>
            </div>
        );
    }

    const rounds = data.transcript.map(r => {
        return {
            round: r.round, refinedRequirement: r.judge.refinedSpec.summary, agentChanges: r.agentNotes.map(e => {
                return { agent: e.agent, refinedRequirement: e.refinedRequirement }
            })
        }
    })

    return (
        <section
            ref={ref}
            className="py-10 px-6 bg-black text-white"
        >
            <div className="mx-auto">
                <div className="flex flex-col gap-4 items-center justify-center mb-20">
                    <h2 className="text-4xl font-extrabold text-center drop-shadow-lg">
                        Refinement Rounds
                    </h2>
                    <p>Explore comprehensive AI agent suggestions across multiple rounds of analysis</p>

                </div>
                <div className="mx-auto space-y-32 px-6">
                    {rounds.map((round, idx) => {
                        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
                        return (
                            <motion.div
                                key={idx}
                                ref={ref}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: idx * 0.3 }}
                                className="space-y-10"
                            >
                                {/* Round Title */}
                                <h2 className="text-5xl font-extrabold text-start drop-shadow-[0_0_15px_rgba(0,200,255,0.6)]">
                                    Round {round.round}
                                </h2>
                                {/* Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                                    {round.agentChanges.map((e, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={inView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: i * 0.2 }}
                                            className="p-6 rounded-2xl  border border-white/20 text-center shadow-lg hover:shadow-[0_0_25px_rgba(0,200,255,0.7)] transition"
                                        >
                                            <AgentCard img={agentImgConfig[i]} agent={e.agent} refinement={e.refinedRequirement} />
                                        </motion.div>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold text-yellow-300">Round {round.round} final Refined Product description : </h2>
                                <p className="italic font-semibold">{round.refinedRequirement}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CheckpointRounds;
