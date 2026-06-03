import React from "react";
import { useLocation } from "react-router-dom";
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

    // Static Data
    const agents = ["Agent A", "Agent B", "Agent C", "Agent D"];
    const scores = [85, 72, 90, 65];
    const timestamps = [2, 4, 6, 8];
    const rounds = [12, 15, 10, 8];
    const contributions = [30, 25, 25, 20];
    const workingTime = [40, 35, 50, 28];

    // Common Colors
    const colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#f43f5e"];

    // Chart Data
    const scoresData = {
        labels: agents,
        datasets: [{ label: "Score", data: scores, backgroundColor: colors }],
    };

    const timestampsData = {
        labels: agents,
        datasets: [
            {
                label: "Timestamps (hrs)",
                data: timestamps,
                borderColor: "#06b6d4",
                backgroundColor: "rgba(6,182,212,0.3)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "#06b6d4",
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

    const workingTimeData = {
        labels: agents,
        datasets: [{ label: "Working Hours", data: workingTime, backgroundColor: colors }],
    };

    // Chart Options
    const chartOptions = {
        responsive: true,
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: {
            y: { ticks: { color: "#fff" }, beginAtZero: true },
            x: { ticks: { color: "#fff" } },
        },
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white font-sans">
            {/* Header */}
            {/* {data ? (<div>daat found {data.final.refinedSpec.title}</div>) : (<div>Daat not found</div>)} */}
            <header className="p-6 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Agents Statistics Dashboard
                </h1>
                <p className="text-gray-400 mt-2">Analyzing performance, contributions & work distribution</p>
            </header>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 p-6">
                {/* Scores */}
                <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-cyan-300 mb-4">Scores of Agents</h2>
                    <Bar data={scoresData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
                </div>

                {/* Timestamps */}
                <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-cyan-300 mb-4">Timestamps by Scores</h2>
                    <Line data={timestampsData} options={chartOptions} />
                </div>

                {/* Rounds */}
                <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-cyan-300 mb-4">No. of Rounds per Agent</h2>
                    <Doughnut data={roundsData} options={chartOptions} />
                </div>

                {/* Contributions */}
                <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-cyan-300 mb-4">Contributions of Agents (%)</h2>
                    <Pie data={contributionsData} options={chartOptions} />
                </div>

                {/* Working Time */}
                <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 shadow-lg lg:col-span-2">
                    <h2 className="text-xl font-semibold text-cyan-300 mb-4">Working Time Comparison</h2>
                    <Bar
                        data={workingTimeData}
                        options={{
                            ...chartOptions,
                            indexAxis: "y",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
