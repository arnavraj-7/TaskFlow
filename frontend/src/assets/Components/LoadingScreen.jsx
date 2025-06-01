import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoading = true }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState('');

  const loadingMessages = [
    "Setting up your tasks...",
    "Organizing your workflow...",
    "Preparing your dashboard...",
    "Loading your productivity tools...",
    "Synchronizing your data..."
  ];

  const statusMessages = [
    "Initializing your workspace",
    "Loading user preferences",
    "Syncing your tasks",
    "Preparing the interface",
    "Almost ready!"
  ];

  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The secret of getting ahead is getting started.",
    "Productivity is never an accident. It's the result of commitment to excellence.",
    "Focus on being productive instead of busy.",
    "Your future is created by what you do today, not tomorrow.",
    "A goal without a timeline is just a dream.",
    "Progress, not perfection, is the goal.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  // Initialize quote on mount
  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Progress simulation
  useEffect(() => {
    if (!isLoading) return;

    const progressTimer = setTimeout(() => {
      if (currentProgress < 100) {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(currentProgress + increment, 100);
        setCurrentProgress(newProgress);

        // Update status based on progress
        const statusIndex = Math.min(Math.floor(newProgress / 20), statusMessages.length - 1);
        setCurrentStatusIndex(statusIndex);

        // Complete loading when progress reaches 100
        if (newProgress >= 100) {
         return;}
      }
    }, Math.random() * 800 + 400);

    return () => clearTimeout(progressTimer);
  }, [currentProgress, isLoading]);

  // Cycle through loading messages
  useEffect(() => {
    if (!isLoading || currentProgress >= 100) return;

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(messageTimer);
  }, [isLoading, currentProgress]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #6366f1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes dots {
          0%, 20% { color: rgba(255, 255, 255, 0.3); }
          40% { color: rgba(255, 255, 255, 1); }
          100% { color: rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes bounce-in {
          0% { 
            opacity: 0;
            transform: scale(0.3) translateY(50px); 
          }
          50% { 
            opacity: 1;
            transform: scale(1.1) translateY(-10px); 
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0); 
          }
        }
        
        .float { 
          animation: float 3s ease-in-out infinite; 
        }
        
        .pulse-glow { 
          animation: pulse-glow 2s ease-in-out infinite; 
        }
        
        .rotate { 
          animation: rotate 2s linear infinite; 
        }
        
        .typewriter { 
          animation: typewriter 2s steps(20) forwards, blink 0.8s infinite;
          border-right: 2px solid #6366f1;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          max-width: fit-content;
        }
        
        .fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
          opacity: 0;
        }
        
        .bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          opacity: 0;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .loading-dots span {
          animation: dots 1.4s infinite ease-in-out both;
          display: inline-block;
          margin: 0 2px;
        }
        
        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        .loading-dots span:nth-child(3) { animation-delay: 0s; }
        
        .task-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .task-icon:hover {
          transform: scale(1.2) rotate(10deg);
        }
        
        .task-icon:nth-child(1) { animation-delay: 0.1s; }
        .task-icon:nth-child(2) { animation-delay: 0.2s; }
        .task-icon:nth-child(3) { animation-delay: 0.3s; }
        .task-icon:nth-child(4) { animation-delay: 0.4s; }
        .task-icon:nth-child(5) { animation-delay: 0.5s; }
        
        .delay-300 { animation-delay: 0.3s; animation-fill-mode: both; }
        .delay-600 { animation-delay: 0.6s; animation-fill-mode: both; }
        .delay-900 { animation-delay: 0.9s; animation-fill-mode: both; }
        .delay-1200 { animation-delay: 1.2s; animation-fill-mode: both; }
        .delay-1500 { animation-delay: 1.5s; animation-fill-mode: both; }
      `}</style>

      <div className="text-center w-full max-w-2xl">
        {/* Logo Section */}
        <div className="mb-12 fade-in-up">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 float">
              TaskFlow
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pulse-glow"></div>
          </div>
        </div>

        {/* Main Loading Animation */}
        <div className="mb-12 fade-in-up delay-300">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="w-full h-full border-4 border-gray-700/50 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full rotate"></div>
              
              {/* Inner Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full pulse-glow flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
              </div>
            </div>

            {/* Floating Task Icons */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="task-icon absolute top-4 left-1/4 w-8 h-8 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-lg flex items-center justify-center bounce-in pointer-events-auto">
                <span className="text-amber-400 text-sm">📋</span>
              </div>
              <div className="task-icon absolute top-1/3 right-1/4 w-8 h-8 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg flex items-center justify-center bounce-in pointer-events-auto">
                <span className="text-green-400 text-sm">✅</span>
              </div>
              <div className="task-icon absolute bottom-4 left-1/3 w-8 h-8 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg flex items-center justify-center bounce-in pointer-events-auto">
                <span className="text-red-400 text-sm">⏰</span>
              </div>
              <div className="task-icon absolute top-1/2 left-4 w-8 h-8 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg flex items-center justify-center bounce-in pointer-events-auto">
                <span className="text-purple-400 text-sm">⭐</span>
              </div>
              <div className="task-icon absolute bottom-1/3 right-8 w-8 h-8 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg flex items-center justify-center bounce-in pointer-events-auto">
                <span className="text-cyan-400 text-sm">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className="mb-8 fade-in-up delay-600">
          <div className="h-12 flex items-center justify-center">
            <p key={currentMessageIndex} className="text-2xl md:text-3xl font-semibold text-white typewriter">
              {loadingMessages[currentMessageIndex]}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 fade-in-up delay-900">
          <div className="w-64 h-3 bg-gray-700/50 rounded-full mx-auto overflow-hidden backdrop-blur-sm border border-gray-600/20">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shimmer transition-all duration-500 ease-out"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm mt-3 font-medium">
            {Math.round(currentProgress)}% Complete
          </p>
        </div>

        {/* Status Messages */}
        <div className="fade-in-up delay-1200">
          <p className="text-gray-300 text-lg mb-4 font-medium">
            {currentProgress >= 100 ? "Welcome to TaskFlow!" : statusMessages[currentStatusIndex]}
          </p>
          <div className="loading-dots text-gray-400 text-xl">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-12 fade-in-up delay-1500">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 max-w-md mx-auto shadow-2xl">
            <div className="mb-3">
              <svg className="w-6 h-6 text-blue-400 mx-auto opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <p className="text-gray-300 italic text-sm leading-relaxed">
              {currentQuote}
            </p>
            <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-1">
              <span>—</span>
              <span className="font-medium">TaskFlow Team</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;