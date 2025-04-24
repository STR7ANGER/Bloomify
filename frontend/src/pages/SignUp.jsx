import  { useState } from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // In a real application, you would submit this data to your backend
    // This is a simplified example for demonstration purposes
    login({
      email,
      firstName,
      lastName,
      id: `user_${Date.now()}` // Generate a mock user ID
    });
    
    navigate("/"); // Redirect to home page after successful signup
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen signup-bg bg-cover bg-center">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-0"></div>

      <div className="bg-white shadow-lg drop-shadow-xl py-16 px-10 w-[32rem] text-center border border-gray-200 rounded-2xl z-2">
        <Link to="/">
          <div className="flex justify-center mb-12">
            <img
              src={bloomifyBlack}
              className="w-[22rem] h-auto"
              alt="bloomify"
            />
          </div>
        </Link>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 text-lg">
          {error && (
            <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="John"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal placeholder-gray-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          
          <input
            type="text"
            placeholder="Doe"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal placeholder-gray-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          
          <input
            type="email"
            placeholder="johndoe1234@email.com"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="col-span-2 flex justify-center">
            <button 
              type="submit"
              className="bg-[#021e2a] hover:bg-[#23454f] text-white text-lg p-3 mt-3 w-full rounded-full"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center col-span-2 mt-6 text-base font-normal">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 tracking-[-0.03em] font-medium">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;