// About.jsx
import React from "react";
import demoVideo from "../assets/demo-video.mp4"
import shot1 from '../assets/shot1.png'
import shot2 from '../assets/shot2.png'

const About = () => {
  return (
    <div className="bg-[#0b0b0b] text-white font-sans">

      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <h1 className="text-5xl font-extrabold mb-4">About Refine AI</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Transforming product requirements with AI-powered collaboration, debate, and refinement.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">⚡ How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">1. Input</h3>
            <p className="text-gray-300">You provide raw product requirements or vague ideas.</p>
          </div>
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">2. AI Collaboration</h3>
            <p className="text-gray-300">Intelligent agents debate, refine, and suggest improvements in real time.</p>
          </div>
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">3. Output</h3>
            <p className="text-gray-300">Receive well-structured, high-quality product requirements faster than ever.</p>
          </div>
        </div>
      </section>

      {/* Working Video */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
        <h2 className="text-4xl font-bold text-center mb-8">🎥 Watch How It Works</h2>
        <div className="flex justify-center">
          <video
            className="w-full max-w-3xl h-full rounded-xl shadow-lg"
            controls
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Screenshots / Images */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">📸 Screenshots</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <img src={shot1} alt="Screenshot 1" className="rounded-xl shadow-lg" />
          <img src={shot2} alt="Screenshot 2" className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* About the Platform */}
      <section className="py-16 bg-[#161b22] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🚀 Our Mission</h2>
          <p className="text-gray-300 text-lg">
            Refine AI is designed to revolutionize how product teams create and refine requirements.
            By using AI agents that collaborate, debate, and analyze, we empower businesses to go from
            raw ideas to actionable PRDs in minutes, not hours.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div className="bg-[#0d1117] p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold">10x</h3>
              <p className="text-gray-400">Faster Refinement</p>
            </div>
            <div className="bg-[#0d1117] p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-gray-400">Accuracy Rate</p>
            </div>
            <div className="bg-[#0d1117] p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold">2 min</h3>
              <p className="text-gray-400">Avg Debate Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <h2 className="text-4xl font-bold mb-4">Ready to Refine Faster?</h2>
        <p className="mb-6 text-lg">Get started with Refine AI and supercharge your product development process.</p>
        <a href="#" className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
          Get Started Free
        </a>
      </section>

    </div>
  );
};

export default About;
