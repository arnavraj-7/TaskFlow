import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const ServerLoadingAlert = ({ showAfterDelay = 8000 }) => {
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [dots, setDots] = useState("");

  // Show alert after specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showAfterDelay);

    return () => clearTimeout(timer);
  }, [showAfterDelay]);

  // Animate dots
  useEffect(() => {
    if (!isVisible) return;

    const dotsTimer = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(dotsTimer);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes gentlePulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes shimmerBg {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .slide-in {
          animation: slideInFromTop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .gentle-pulse {
          animation: gentlePulse 3s ease-in-out infinite;
        }

        .shimmer-bg {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmerBg 3s infinite;
        }

        .spin {
          animation: spin 2s linear infinite;
        }

        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .pulse-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .pulse-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .pulse-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-[9999] bg-gray-900/80 backdrop-blur-sm">
          <div className="pointer-events-auto">
            <Alert className="bg-gray-900/95 backdrop-blur-xl border-2 border-blue-400/60 text-white shadow-2xl gentle-pulse shimmer-bg w-auto min-w-[300px] max-w-[500px] py-4 px-6 relative rounded-lg">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg pointer-events-none"></div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200 z-10 p-1 rounded-full hover:bg-white/10"
                aria-label="Close alert"
              >
                <X size={14} />
              </button>

              <div className="relative flex items-center gap-4 pr-6">
                {/* Loading Icon */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 border-2 border-gray-600/50 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-transparent border-t-blue-400 border-r-purple-400 rounded-full spin"></div>
                  </div>
                </div>

                {/* Alert Content */}
                <div className="">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-blue-300 text-sm drop-shadow-lg whitespace-nowrap">
                      Welcome, {user ? user.firstName : "User"}!
                      <br />
                      Server Starting Up{" "}
                      <span className="text-xl animate-spin">🚀</span>
                      {/* <span className="text-blue-300 font-mono text-sm w-4 drop-shadow-sm"> */}
                      {/* {dots} */}
                      {/* </span> */}
                    </h4>
                  </div>

                  <AlertDescription className="text-gray-200 w-full text-xs leading-relaxed font-medium drop-shadow-sm">
                    Our render server is waking up from sleep mode. This may
                    take a moment.
                    <br />
                    <span className="text-gray-300 text-xs mt-1 block">
                      Please wait while we initialize your workspace.
                      <br />
                      <br />
                      <span className="text-red-400 font-semibold">
                        If this takes too long, please refresh the page.
                      </span>
                    </span>
                  </AlertDescription>

                  {/* Progress Indicator */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-400 rounded-full pulse-dot"></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full pulse-dot"></div>
                      <div className="w-1 h-1 bg-cyan-400 rounded-full pulse-dot"></div>
                    </div>
                    <span className="font-medium text-xs">
                      Initializing services
                    </span>
                  </div>
                </div>

                {/* Server Icon */}
                <div className="">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Example usage with your loading screen
const LoadingScreen = ({ isLoading = true }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState("");

  const loadingMessages = [
    "Setting up your tasks...",
    "Organizing your workflow...",
    "Preparing your dashboard...",
    "Loading your productivity tools...",
    "Synchronizing your data...",
  ];

  const statusMessages = [
    "Initializing your workspace",
    "Loading user preferences",
    "Syncing your tasks",
    "Preparing the interface",
    "Almost ready!",
  ];

  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The secret of getting ahead is getting started.",
    "Productivity is never an accident. It's the result of commitment to excellence.",
    "Focus on being productive instead of busy.",
    "Your future is created by what you do today, not tomorrow.",
    "A goal without a timeline is just a dream.",
    "Progress, not perfection, is the goal.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
  ];

  // Initialize quote on mount
  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Progress simulation (slower for demo)
  useEffect(() => {
    if (!isLoading) return;

    const progressTimer = setTimeout(() => {
      if (currentProgress < 100) {
        const increment = Math.random() * 8 + 2; // Slower progress
        const newProgress = Math.min(currentProgress + increment, 98);
        setCurrentProgress(newProgress);

        const statusIndex = Math.min(
          Math.floor(newProgress / 20),
          statusMessages.length - 1
        );
        setCurrentStatusIndex(statusIndex);
      }
    }, Math.random() * 1500 + 800); // Longer delays

    return () => clearTimeout(progressTimer);
  }, [currentProgress, isLoading]);

  // Cycle through loading messages
  useEffect(() => {
    if (!isLoading || currentProgress >= 100) return;

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 4000); // Slower message cycling

    return () => clearInterval(messageTimer);
  }, [isLoading, currentProgress]);

  if (!isLoading) return null;

  return (
    <>
      {/* Server Loading Alert - shows after 8 seconds */}
      <div className="fixed top-5 z-[9999] w-full flex justify-center">
        <ServerLoadingAlert showAfterDelay={5000} />
      </div>

      {/* Original Loading Screen */}
      <div className="fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes pulse-glow {
            0%,
            100% {
              box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(99, 102, 241, 0.8);
            }
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes typewriter {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink {
            0%,
            50% {
              border-color: transparent;
            }
            51%,
            100% {
              border-color: #6366f1;
            }
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
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          @keyframes dots {
            0%,
            20% {
              color: rgba(255, 255, 255, 0.3);
            }
            40% {
              color: rgba(255, 255, 255, 1);
            }
            100% {
              color: rgba(255, 255, 255, 0.3);
            }
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
            animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)
              forwards;
            opacity: 0;
          }

          .shimmer {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .loading-dots span {
            animation: dots 1.4s infinite ease-in-out both;
            display: inline-block;
            margin: 0 2px;
          }

          .loading-dots span:nth-child(1) {
            animation-delay: -0.32s;
          }
          .loading-dots span:nth-child(2) {
            animation-delay: -0.16s;
          }
          .loading-dots span:nth-child(3) {
            animation-delay: 0s;
          }

          .task-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .task-icon:hover {
            transform: scale(1.2) rotate(10deg);
          }

          .task-icon:nth-child(1) {
            animation-delay: 0.1s;
          }
          .task-icon:nth-child(2) {
            animation-delay: 0.2s;
          }
          .task-icon:nth-child(3) {
            animation-delay: 0.3s;
          }
          .task-icon:nth-child(4) {
            animation-delay: 0.4s;
          }
          .task-icon:nth-child(5) {
            animation-delay: 0.5s;
          }

          .delay-300 {
            animation-delay: 0.3s;
            animation-fill-mode: both;
          }
          .delay-600 {
            animation-delay: 0.6s;
            animation-fill-mode: both;
          }
          .delay-900 {
            animation-delay: 0.9s;
            animation-fill-mode: both;
          }
          .delay-1200 {
            animation-delay: 1.2s;
            animation-fill-mode: both;
          }
          .delay-1500 {
            animation-delay: 1.5s;
            animation-fill-mode: both;
          }
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
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    ></path>
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
              <p
                key={currentMessageIndex}
                className="text-2xl md:text-3xl font-semibold text-white typewriter"
              >
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
              {currentProgress >= 98
                ? "Finalizing setup..."
                : statusMessages[currentStatusIndex]}
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
                <svg
                  className="w-6 h-6 text-blue-400 mx-auto opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
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
    </>
  );
};

export default LoadingScreen;
