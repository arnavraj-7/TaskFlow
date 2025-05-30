// Place this at the bottom of your App.jsx or as a separate <Footer /> component
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-t border-gray-800 text-gray-300 pt-8 pb-3">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Arnav Raj</span>. All rights reserved.
            </p>
          </div>
          
          {/* GitHub Link */}
          <a
            href="https://github.com/arnavraj-7/ToDoList"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-gray-400 group-hover:text-white transition-colors duration-300"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33C3.72 14.91 3.3 13.38 3.3 13.38c-.36-.91-.88-1.15-.88-1.15-.72-.49.05-.48.05-.48.79.06 1.2.81 1.2.81.71 1.2 1.87.86 2.33.66.07-.52.28-.86.5-1.06-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 8 3.5a9.57 9.57 0 0 1 2.5.34c1.9-1.29 2.73-1.02 2.73-1.02.56 1.38.21 2.4.11 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.29.25.54.74.54 1.5v2.22c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
              View on GitHub
            </span>
          </a>
        </div>
        
        {/* Decorative line */}
        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            Built with ❤️ using React,Tailwind CSS and Express
          </p>
        </div>
      </div>
    </footer>
    )
}

export default Footer
