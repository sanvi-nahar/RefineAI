import React, { useState, useEffect } from 'react';
import { formatReadableDate } from '../utils/formatTime';
import { Folder, Plus, LogOut, Trash2, Eye, LayoutDashboard, UserCheck, Briefcase } from 'lucide-react';

function Dashboard() {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${apiBase}/api/current_user`, { credentials: "include" })
            .then(res => res.json())
            .then(data => { setUser(data.user) });
    }, [apiBase]);

    useEffect(() => {
        fetch(`${apiBase}/api/user_projects`, { credentials: "include" })
            .then(res => res.json())
            .then(data => { setProjects(data) });
    }, [apiBase]);

    const handleLogout = async () => {
        window.location.href = `${apiBase}/logout`;
    }

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            const response = await fetch(`${apiBase}/api/delete_project/${projectId}`, {
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
        return (
            <div className="flex items-center justify-center min-h-[80vh] bg-[#fafafa]">
                <div className="bg-white border border-zinc-200 p-8 rounded-xl shadow-sm text-center max-w-sm w-full mx-6">
                    <div className="h-12 w-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 text-lg font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-1">Authentication Required</h3>
                    <p className="text-sm text-zinc-500 mb-6">Please log in to access your personal dashboard workspace.</p>
                    <a href="/signup" className="block w-full bg-zinc-950 hover:bg-zinc-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                        Go to Sign Up
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex font-sans text-zinc-900 selection:bg-zinc-950 selection:text-white">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-zinc-50 border-r border-zinc-200 hidden md:flex flex-col justify-between p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold tracking-tight text-zinc-800 uppercase font-mono">Workspace</span>
                    </div>
                    <nav className="flex flex-col space-y-1">
                        <a 
                            href="/" 
                            className="flex items-center gap-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            <LayoutDashboard size={16} />
                            Home
                        </a>
                        <a 
                            href="/dashboard" 
                            className="flex items-center gap-2.5 text-zinc-900 bg-zinc-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                            <Briefcase size={16} />
                            Projects
                        </a>
                    </nav>
                </div>
                <div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-zinc-200/50 hover:bg-zinc-200 text-zinc-700 font-medium py-2 rounded-lg text-xs transition-colors"
                    >
                        <LogOut size={12} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto overflow-y-auto">
                {/* Header Welcome banner */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{user.name}</h1>
                        <p className="text-sm text-zinc-500 mt-1">Manage and track your AI-assisted product specifications</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border border-zinc-200 shadow-sm object-cover"
                        />
                    </div>
                </header>

                {/* Quick Stats Panel */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Folder size={12} />
                            All Projects
                        </span>
                        <p className="text-3xl font-bold tracking-tight text-zinc-950 font-mono mt-2">{projects.length}</p>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                            <UserCheck size={12} />
                            Owner ID
                        </span>
                        <p className="text-[10px] font-mono text-zinc-500 break-all mt-3.5 bg-zinc-50 border border-zinc-100 p-1.5 rounded">{user.googleId}</p>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                            Status
                        </span>
                        <p className="text-sm font-semibold text-emerald-600 mt-3 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Connected to Database
                        </p>
                    </div>
                </section>

                {/* Project History */}
                <section className="bg-white border border-zinc-200 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex justify-between items-center border-b border-zinc-200 px-6 py-4 bg-zinc-50/50">
                        <h2 className="text-base font-semibold text-zinc-900">Project History</h2>
                        <a href="/refine">
                            <button className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm">
                                <Plus size={14} />
                                New Project
                            </button>
                        </a>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {projects.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-sm text-zinc-500 mb-4">No project specifications found in your workspace.</p>
                                <a href="/refine" className="text-xs font-bold text-blue-600 hover:text-blue-700">Create your first specification →</a>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-50/30">Project Name</th>
                                        <th className="py-3 px-6 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-50/30">Date Created</th>
                                        <th className="py-3 px-6 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-50/30 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {projects.map((project) => (
                                        <tr key={project._id} className="hover:bg-zinc-50/40 transition-colors">
                                            <td className="py-4 px-6 text-sm font-medium text-zinc-900">{project.title || "Untitled Specification"}</td>
                                            <td className="py-4 px-6 text-sm text-zinc-500 font-mono">{formatReadableDate(project.createdAt)}</td>
                                            <td className="py-4 px-6 text-sm text-right flex items-center justify-end gap-2.5">
                                                <a href={`/project/${project._id}`}>
                                                    <button className="inline-flex items-center gap-1 border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                                                        <Eye size={12} />
                                                        View
                                                    </button>
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(project._id)} 
                                                    className="inline-flex items-center gap-1 border border-red-100 text-red-600 bg-white hover:bg-red-50 hover:border-red-250 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                                                >
                                                    <Trash2 size={12} />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
