import { useState } from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name,
        email,
        password,
        phoneNumber
      };
      
      const result = await register(userData);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            placeholder="Full Name"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
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