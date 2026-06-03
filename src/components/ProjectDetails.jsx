// src/pages/ProjectPage.jsx
import React, { useEffect, useState } from "react";

const ProjectPage = ({data}) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    setProject(data)
    console.log(data)
  }, [data]);

  if (!project) return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
          <h1 className="text-3xl font-bold text-blue-400">{project.title}</h1>
          <p className="text-sm text-gray-400">Slug: {project.slug}</p>
          <p className="text-sm text-gray-400">Project ID: {project._id}</p>
          <p className="mt-3 text-gray-200">{project.requirement}</p>
          <p className="mt-2 text-xs text-gray-500">
            Created At: {new Date(project.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Judge Section */}
        {project.judge && (
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Judge</h2>
            <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(project.judge, null, 2)}
            </pre>
          </div>
        )}

        {/* Feedback Section */}
        {project.feedback && project.feedback.length > 0 && (
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Feedback</h2>
            <div className="space-y-4">
              {project.feedback.map((f, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-xl border border-gray-700"
                >
                  <p className="text-sm text-gray-300">{f.feedback || f.text || "No feedback text"}</p>
                  {(f.agent || f.author) && (
                    <p className="text-xs text-gray-500 mt-2">— {f.agent || f.author}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
