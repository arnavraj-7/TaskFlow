import React from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';

const SignUpPage = () => {
  const { isSignedIn } = useUser();
  
  if (isSignedIn) {
    window.location.href = '/TaskFlow';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Shapes (Same as Login) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4">
              <span className="text-2xl font-bold text-white">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Join TaskFlow</h3>
            <p className="text-gray-400">Start your productivity journey today</p>
          </div>

          <div className="clerk-container">
            <SignUp 
              appearance={{
                baseTheme: 'dark',
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent border-0 shadow-none',
                  headerTitle: 'text-white text-xl font-semibold',
                  headerSubtitle: 'text-gray-400',
                  socialButtonsBlockButton: 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50 text-white',
                  socialButtonsBlockButtonText: 'text-white font-medium',
                  dividerLine: 'bg-gray-600',
                  dividerText: 'text-gray-400',
                  formFieldLabel: 'text-gray-300 font-medium',
                  formFieldInput: 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/50',
                  formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105',
                  footerActionLink: 'text-blue-400 hover:text-blue-300',
                },
                variables: {
                  colorPrimary: '#3B82F6',
                  colorBackground: 'transparent',
                  colorInputBackground: 'rgba(55, 65, 81, 0.5)',
                  colorInputText: '#FFFFFF',
                  borderRadius: '0.75rem'
                }
              }}
              redirectUrl="/taskflow"
              signInUrl="/login"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={() => window.location.href = '/login'}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;