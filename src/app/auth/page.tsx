'use client';

import { useState } from 'react';
import LoginForm from '../components/loginform';
import SignupForm from '../components/signupform';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-neutral-100 to-white px-6 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
      `}</style>

      <div className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full animate-fade-in bg-white border border-neutral-200">

        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center space-y-6 bg-white">
          <div>
            <h1 className="text-4xl font-extrabold text-[#111]">
              🚀 Welcome to Finverse
            </h1>
            <p className="text-neutral-600 mt-3 text-lg">
              Virtual stock trading made simple. Learn. Compete. Win.
            </p>
          </div>
          
          {/* Toggle Tabs */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow ${
                isLogin
                  ? 'bg-[#FF385C] text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)} 
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow ${
                !isLogin
                  ? 'bg-[#FF385C] text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="mt-6">
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-10 relative overflow-hidden border-l border-neutral-200">
          <div className="text-center text-neutral-800 space-y-4 z-10">
            <h2 className="text-3xl font-bold text-[#FF385C]">💡 Trade Smart, Virtually</h2>
            <p className="text-neutral-700 text-lg">
              Use $10,000 virtual cash. Learn with AI guidance. No real risk.
            </p>
            <p className="text-neutral-500 text-sm italic mt-2">
              "Experience is the best investment."
            </p>
          </div>

          {/* Optional Glow Orb */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-[#FF385C] rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
