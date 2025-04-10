import React from "react";
import bloomifyWhite from "../assets/logos/bloomify-white.png";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white shadow-lg drop-shadow-xl p-6 w-[40rem] text-center border border-gray-200 rounded-2xl">
        <Link to="/">
          <div className="flex justify-center mb-10">
            <img
              src={bloomifyBlack}
              className="w-[25rem] h-auto"
              alt="bloomify"
            />
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800 col-span-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md border border-gray-300 bg-gray-50 font-light col-span-2 placeholder-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800 col-span-2"
          />

          <div className="col-span-2 flex justify-center">
            <button className="bg-[#1E5128] hover:bg-[#118B50] text-white p-2 mt-2 w-full rounded-full col-span-2">
              Log In
            </button>
          </div>

          <p className="text-center col-span-2 mt-5 font-light">
            <Link to="/" className="text-blue-700 tracking-[-0.03em]">
              Forgot Password?
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
