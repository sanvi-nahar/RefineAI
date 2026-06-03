// pages/Signup.jsx
import React from 'react';
import googleLogo from '../assets/google-logo.png'; // Add a Google logo image
import heroImage from '../assets/hero.png'; // Optional graphic illustration
import bgImage from '../assets/signup-bg.jpg'; // Optional graphic illustration

function Signup() {

    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center flex-col md:flex-row px-6 py-16"
            style={{ backgroundImage: `url(${bgImage})` }} // use imported image
        >
            {/* Graphic Section */}
            {/* <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
                <img src={heroImage} alt="Signup Illustration" className="w-full max-w-md rounded-xl shadow-lg" />
            </div> */}

            {/* Signup Card */}
            <div className="md:w-1/2 text-white shadow-lg rounded-xl p-10 flex flex-col items-center bg-black bg-opacity-50 backdrop-blur-sm">

                <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

                <p className="text-gray-100 mb-8 text-center">
                    Sign in quickly and securely using your Google account
                </p>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-100 transition px-4 py-3 rounded-lg shadow-md"
                >
                    <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-3" />
                    <span className="text-gray-700 font-semibold">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}

export default Signup;
