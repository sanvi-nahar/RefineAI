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
    <header className="bg-black text-blue-700 sticky top-0 z-50 shadow-md px-10 py-5">
      <div className="container bg-blue-600/20 rounded-full mx-auto flex justify-between items-center py-4 px-6">
        <a href="/">
          <div className='flex gap-3 items-center'>
            <img src={logoImg} alt="logo img" className='h-12 w-12 rounded-full' />
            <h1 className="text-2xl font-bold text-white cursor-pointer">Refine Ai</h1>
          </div>
        </a>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Home</Link>
          <Link to="/about" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">About us</Link>
          <Link to="/agents" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Agents</Link>
          <Link to="/analytics" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Analytics</Link>
          {user ? (
            <Link to="/dashboard"><img src={user.picture} alt="user profile" className='h-10 rounded-full' /></Link>
          ) : (
            <Link to="/signup" className="block border-1 border-white text-white font-semibold px-4 py-1 rounded hover:bg-gray-800 transition">Sign Up</Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
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
        <nav className="md:hidden bg-blue-600 text-white px-6 pb-4 space-y-2">
          <Link to="/" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Home</Link>
          <Link to="/about" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">About us</Link>
          <Link to="/agents" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Agents</Link>
          <Link to="/analytics" className="block px-3 py-1 rounded transition text-white/70 duration-300 hover:text-purple-400">Analytics</Link>
          {user ? (
            <Link to="/dashboard"><img src={user.picture} alt="user profile" className='h-10 rounded-full' /></Link>
          ) : (
            <Link to="/signup" className="block bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-200 transition">Sign Up</Link>
          )}        </nav>
      )}
    </header>
  );
}

export default Header;
