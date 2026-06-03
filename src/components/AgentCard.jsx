export default function AgentCard({ img, agent, refinement }) {
    return (
        <div className="flex flex-col gap-3 p-4 bg-black min-h-[250px] rounded-3xl  ">
            <div className="flex flex-row items-center justify-between border-b-2 pb-2 border-purple-500">
                <div className="flex flex-row items-center  ">
                    <img src={img} alt="agent img" className="h-10" />
                    <h2 className="font-bold text-xl text-white">{agent}</h2>
                </div>
                <p className="font-semibold text-purple-800">🚀90%</p>
            </div>
            <p className="font-semibold text-start mt-4 text-white">
                {refinement}
            </p>
        </div>
    );
}
