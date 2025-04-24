import { useState } from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setLoading(true);
      const result = await login(email, password);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen signup-bg bg-cover bg-center">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-0"></div>

      <div className="bg-white shadow-lg drop-shadow-xl py-16 px-10 w-[32rem] text-center border border-gray-200 rounded-2xl">
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
            type="email"
            placeholder="Email"
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

          <div className="col-span-2 flex justify-center">
            <button 
              type="submit"
              className="bg-[#021e2a] hover:bg-[#23454f] text-white text-lg p-3 mt-3 w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          <p className="text-center col-span-2 mt-6 text-base font-normal">
            <Link to="/forgot-password" className="text-blue-700 tracking-[-0.03em] font-medium">
              Forgot Password?
            </Link>
          </p>
          
          <p className="text-center col-span-2 mt-2 text-base font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 tracking-[-0.03em] font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;