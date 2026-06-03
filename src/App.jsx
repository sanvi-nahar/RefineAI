// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home2.jsx';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Refine from './pages/Refine.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Project from './pages/Project.jsx';
import Home2 from './pages/Home2.jsx';
import Agents from './pages/Agents.jsx';
import Analytics from './pages/Analytics.jsx';
import Workflow from './pages/Workflow.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/refine" element={<Refine />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<Project/>} />
        <Route path="/workflow" element={<Workflow/>} />
      </Routes>
    </Router>
  );
}

export default App;
