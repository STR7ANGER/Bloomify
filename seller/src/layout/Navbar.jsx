import React from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ activePath }) => {
  const navItems = [
    { path: "/add-items", label: "Add Items" },
    { path: "/inventory", label: "Inventory" },
    { path: "/orders", label: "Orders" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="h-8 w-8 text-emerald-500" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span className="font-bold text-xl text-gray-800">Bloomify</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activePath && activePath.includes(item.path)
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="text-gray-500 hover:text-emerald-500 transition-colors">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            
            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
                  A
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;