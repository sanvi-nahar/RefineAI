// pages/RequirementRefine.jsx
import React, { useState } from 'react';
import RefinedOutput from '../components/RefinedOutput';
import DownloadPDF from '../components/downloadBtn';
import { useNavigate } from "react-router-dom";


function Refine() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('http://localhost:3000/refine', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requirement: input }), // send the input to backend
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to refine requirement');
      }

      setOutput(data.final); // assuming backend returns { refinedRequirement: "..." }
      setData(data);
    } catch (error) {
      console.error(error);
      setOutput(error.message || 'Error refining requirement. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black font-sans text-gray-800 py-16 px-6 md:px-0">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                 bg-gradient-to-r from-blue-400 to-purple-500 
                 drop-shadow-[0_0_18px_rgba(168,85,247,0.8)] text-center mb-8 w-full">
          Refine Your Project Requirement
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-purple-500/30 w-full max-w-2xl">
          <label className="block mb-2 font-semibold text-yellow-100">
            Enter your project requirement:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your project requirement here..."
            className="w-full border border-purple-600 rounded-md p-3 mb-4 bg-gray-800 text-white 
                 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            rows={6}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-400 
                 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition shadow-[0_0_12px_rgba(168,85,247,0.7)]"
            disabled={loading}
          >
            {loading ? 'Refining...' : 'Refine Requirement'}
          </button>
        </form>


        {/* Output Section */}
        {output && (
          <div>
            <RefinedOutput data={output} />
            <DownloadPDF data={output} />
            {/* passing the api data through states */}
            <button
              onClick={() => navigate("/analytics", { state: { data } })}
              className="bg-white text-black ml-4 px-4 py-2 rounded"
            >
              Go to Analytics
            </button>
            <button
              onClick={() => navigate("/workflow", { state: { data } })}
              className="bg-white text-black ml-4 px-4 py-2 rounded"
            >
              Workflow Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Refine;
