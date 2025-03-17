import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({to, onClick, children, className=""}) => {
  return to ? (
    <Link to={to} className={`bg-[#F0394D] text-white text-xl px-4 py-2 rounded-full shadow-sm drop-shadow-lg hover:bg-[#F0394D] hover:px-5 hover:py-4 hover:shadow-lg transition-all duration-300 ease-in-out
    `}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
}

export default Button
