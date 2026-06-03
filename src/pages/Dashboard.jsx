// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import userImage from '../assets/user.png'; // Replace with user image
import { formatReadableDate } from '../utils/formatTime';

// const projects = [
//     { id: 1, name: "AI Multi-Agent Requirement Refinement", date: "2025-08-23", status: "Completed" },
//     { id: 2, name: "Location-Based Review Platform", date: "2025-07-15", status: "In Progress" },
//     { id: 3, name: "Air Quality Monitoring System", date: "2025-06-10", status: "Completed" },
// ];



function Dashboard() {
    
    const [projects , setProjects] = useState([]); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/current_user", { credentials: "include" })
            .then(res => res.json())
            .then(data => { setUser(data.user) });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/user_projects", { credentials: "include" })
            .then(res => res.json())
            .then(data => { setProjects(data) });
    }, []);

    console.log(projects)

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/delete_project/${projectId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (response.ok) {
                setProjects(prev => prev.filter(p => p._id !== projectId));
            } else {
                const data = await response.json();
                alert(data.error || "Failed to delete project");
            }
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("Failed to connect to the server.");
        }
    };

    if (!user) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-red-100 text-red-700 font-semibold px-6 py-6 rounded-lg shadow-md text-center">
                <p className="mb-4">Please login first</p>
                <a href="/signup">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Go to Login
                    </button>
                </a>
            </div>
        </div>
    }

    const handleLogout = async () => {
        window.location.href = "http://localhost:3000/logout"
    }
    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav className="flex flex-col space-y-3">
                    <a href="/" className="text-gray-700 hover:text-blue-600 font-semibold">Home</a>
                    <a href="/dash" className="text-gray-700 hover:text-blue-600 font-semibold">Projects</a>
                    <button className="w-fit bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold" onClick={handleLogout}>logout</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

                {/* User Profile */}
                <section className="flex flex-col items-center md:flex-row md:items-center bg-white shadow rounded-xl p-6 mb-8">
                    <img
                        src={user.picture}
                        alt="User"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 md:mb-0 md:mr-6 object-cover shadow-lg"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                        <p className="text-gray-600">Software Engineer | AI Enthusiast</p>
                    </div>
                </section>

                {/* Quick Stats / Actions */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Projects Completed</h2>
                        <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Ongoing Projects</h2>
                        <p className="text-3xl font-bold text-blue-600">3</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
                        <p className="text-3xl font-bold text-blue-600">5</p>
                    </div>
                </section>

                {/* Project History */}
                <section className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Project History</h2>
                    <a href="/refine">
                        <button className='bg-gray-700 px-2 py-1 rounded text-white font-semibold'>New Project</button>
                    </a>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200">Project Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200">Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b border-gray-200">{project.title}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{formatReadableDate(project.createdAt)}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 flex gap-2">
                                            <a href={`/project/${project._id}`}>
                                                <button className='border-2 border-black px-4 py-1 rounded hover:bg-black hover:text-white transition-colors'>view</button>
                                            </a>
                                            <button 
                                                onClick={() => handleDelete(project._id)} 
                                                className='border-2 border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-colors'
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Dashboard;
