import React from "react";
import { Link } from "react-router-dom"; // Only needed if using React Router

const Button = ({ children, href, onClick, className = "" }) => {
  const handleClick = (e) => {
    // Scroll to top instantly
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'instant' for immediate scrolling without animation
    });
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    "bg-[#1E5128] text-white text-xl px-4 py-2 rounded-full shadow-sm drop-shadow-lg hover:bg-[#118B50] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out";

  if (href) {
    // Check if it's an internal link (React Router) or an external link
    const isInternal = href.startsWith("/");

    return isInternal ? (
      <Link to={href} onClick={handleClick} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    ) : (
      <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
