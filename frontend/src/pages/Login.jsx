import React from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen signup-bg bg-cover bg-center">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

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

        <div className="grid grid-cols-2 gap-5 text-lg">

          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-lg border border-gray-300 bg-gray-50 font-normal col-span-2 placeholder-gray-400"
          />

          <div className="col-span-2 flex justify-center">
            <button className="bg-[#021e2a] hover:bg-[#23454f] text-white text-lg p-3 mt-3 w-full rounded-full">
              Log In
            </button>
          </div>

          <p className="text-center col-span-2 mt-6 text-base font-normal">
            <Link to="/" className="text-blue-700 tracking-[-0.03em] font-medium">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
