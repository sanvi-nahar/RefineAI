import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails.jsx';
import { useParams } from "react-router-dom";
import RefinedOutput from '../components/RefinedOutput.jsx';
import ProjectPage from '../components/ProjectDetails.jsx';


function Project() {
  const { id } = useParams(); // Extracts the dynamic id
  // console.log(id)

  const handleFeedback = () => {
    console.log("feedback")
  }

  const [data, setData] = useState();

  useEffect(() => {
    const url = `http://localhost:3000/api/get_project/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((dat) => {
        // console.log("data from back ", dat);
        setData(dat);
      })
  }, []);

  // console.log(data)

  return (
    <div className='bg-black'>
      <ProjectPage data={data} />
      <form
        onSubmit={handleFeedback}
        className="flex flex-col md:flex-row items-center gap-4 bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Enter your feedback"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transform transition-all"
        >
          Send Feedback
        </button>
      </form>

    </div>
  );
}

export default Project;
