import React from "react";
import { Link } from "react-router-dom";

const Button = ({children, href }) => {
  return href ? (
    <a
      href={href}
      className="bg-[#F0394D] text-white text-xl px-4 py-2 rounded-full shadow-sm drop-shadow-lg hover:bg-[#F0394D] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out
    "
    >
      {children}
    </a>
  ) : (
    <button
      
      className="bg-[#F0394D] text-white text-xl px-4 py-2 rounded-xl shadow-sm drop-shadow-lg hover:bg-[#F0394D] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
