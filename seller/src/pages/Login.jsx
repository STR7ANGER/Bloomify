import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-black p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top colored banner */}
        <div className="h-24 bg-gradient-to-r from-emerald-800 to-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-emerald-100">We missed you!</p>
          </div>
        </div>

        {/* Login form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-800 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-md transition-all"
            >
              Log In
            </button>

            {/* Decorative art element */}
            <div className="relative h-12 flex items-center justify-center">
              <div className="absolute w-full border-t border-gray-200"></div>
              <div className="relative px-3 bg-white text-sm text-gray-500">or continue with</div>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C13.6168 5 15.1013 5.55556 16.2863 6.47078L19.9235 3.00016C17.8088 1.13903 15.0406 0 12 0C7.3924 0 3.39667 2.59022 1.3858 6.40944L5.43024 9.60977C6.40997 6.91218 8.97731 5 12 5Z" fill="#EA4335"/>
                  <path d="M23.4694 12.261C23.4694 11.4718 23.3975 10.7529 23.2741 10.0339H12V14.9661H18.4576C18.1449 16.6004 17.25 17.8868 15.9 18.7364L19.8943 21.9565C22.0615 19.9268 23.4694 16.5059 23.4694 12.261Z" fill="#4285F4"/>
                  <path d="M5.43224 14.3901C5.17424 13.6711 5.01674 12.8817 5.01674 12C5.01674 11.1183 5.15468 10.3289 5.43224 9.60992L1.38781 6.40992C0.51481 8.10269 0 10.0071 0 12C0 13.9929 0.51481 15.8973 1.38781 17.5901L5.43224 14.3901Z" fill="#FBBC05"/>
                  <path d="M12 24C15.0406 24 17.7893 22.9392 19.8944 21.0568L15.9001 17.8367C14.8504 18.5556 13.5589 18.9999 12 18.9999C8.95787 18.9999 6.40997 17.0878 5.43024 14.3902L1.3858 17.5905C3.39667 21.4098 7.3924 24 12 24Z" fill="#34A853"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                New here?{" "}
                <Link to="/signup" className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline">
                  Head to Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;