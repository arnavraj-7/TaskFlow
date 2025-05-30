import React from "react";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";

const LoginPage = () => {
  const { isSignedIn } = useUser();

  // If user is signed in, redirect to main app
  if (isSignedIn) {
    window.location.href = "/TaskFlow";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-32 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 border border-purple-500/20 rotate-12 animate-pulse"></div>

        {/* Floating dots pattern */}
        <div className="absolute top-1/4 right-20">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Info */}
        <div className="text-center lg:text-left space-y-8">
          {/* Brand Logo/Icon */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-bold text-white">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-gray-400 text-sm">
                Organize • Focus • Achieve
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Productivity Hub
              </span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Transform your daily chaos into organized success. Track tasks,
              set goals, and achieve more with our intuitive todo management
              system.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">
                Quick task creation and management
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Stay Focused</h3>
              <p className="text-gray-400 text-sm">
                Prioritize what matters most
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-white font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-400 text-sm">
                Visualize your achievements
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="flex flex-col items-center justify-center">
          {/* Auth Container */}
          <div className="w-full max-w-md">
            {/* Custom Clerk Styling Container */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              {/* Welcome Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Welcome Back!
                </h3>
                <p className="text-gray-400">
                  Sign in to continue your productivity journey
                </p>
              </div>

              {/* Clerk SignIn Component */}
              <div className="clerk-container">
                <SignIn
                  appearance={{
                    baseTheme: "dark",
                    elements: {
                      rootBox: "w-full",
                      card: "bg-gray-900 border border-gray-700 shadow-md",
                      headerTitle: "text-white text-xl font-semibold",
                      headerSubtitle: "text-gray-400",
                      socialButtonsBlockButton:
                        "bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white",
                      socialButtonsBlockButtonText: "text-white font-medium",
                      dividerLine: "bg-gray-600",
                      dividerText: "text-gray-300",
                      formFieldLabel: "text-gray-300 font-medium",
                      formFieldInput:
                        "bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500",
                      formButtonPrimary:
                        "bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      identityPreviewText: "text-white",
                      identityPreviewEditButton:
                        "text-blue-400 hover:text-blue-300",
                    },
                    variables: {
                      colorPrimary: "#3B82F6",
                      colorBackground: "#1F2937",
                      colorInputBackground: "#111827",
                      colorInputText: "#FFFFFF",
                      colorText: "#FFFFFF",
                      borderRadius: "0.75rem",
                    },
                  }}
                  redirectUrl="/TaskFlow"
                  signUpUrl="/SignUp"
                />
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/sign-up")}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign up for free
                </button>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30"></div>
    </div>
  );
};

// CSS for custom animations (add to your global CSS)
const customStyles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Clerk component custom styling */
.clerk-container .cl-rootBox {
  width: 100% !important;
}

.clerk-container .cl-card {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
`;

export default LoginPage;
