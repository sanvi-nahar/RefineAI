// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg'

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/current_user", { credentials: "include" })
      .then(res => res.json())
      .then(data => { setUser(data.user) });
  }, []);

  // console.log(user)

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/">
          <div className="flex gap-2 items-center">
            <img src={logoImg} alt="logo" className="h-8 w-8 rounded-full border border-zinc-200" />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">Refine AI</span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">SaaS</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">About Us</Link>
          <Link to="/agents" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Virtual Team</Link>
          <Link to="/analytics" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Analytics</Link>
          
          <div className="h-4 w-px bg-zinc-200" />

          {user ? (
            <Link to="/dashboard" className="flex items-center">
              <img src={user.picture} alt="user profile" className="h-8 w-8 rounded-full border border-zinc-200 shadow-sm" />
            </Link>
          ) : (
            <Link to="/signup" className="bg-zinc-950 text-white hover:bg-zinc-800 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm">Sign Up</Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600 hover:text-zinc-900 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-zinc-200 mt-3 pt-3 flex flex-col space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">About Us</Link>
          <Link to="/agents" onClick={() => setIsOpen(false)} className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Virtual Team</Link>
          <Link to="/analytics" onClick={() => setIsOpen(false)} className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Analytics</Link>
          
          <div className="h-px w-full bg-zinc-200" />

          {user ? (
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              <img src={user.picture} alt="user profile" className="h-8 w-8 rounded-full border border-zinc-200 shadow-sm" />
              <span className="text-sm font-medium text-zinc-900">Dashboard</span>
            </Link>
          ) : (
            <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-zinc-950 text-white text-center hover:bg-zinc-800 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm">Sign Up</Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
