import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Navbar at the top */}
      <Navbar />
      
      {/* Content area with sidebar */}
      <div className="flex flex-grow container mx-auto px-4 py-6 max-w-full">
        {/* Sidebar with fixed height and responsive display */}
        <div className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto h-[calc(100vh-64px)] sticky top-16"> 
          {/* Adjust top value to match navbar height */}
          <Sidebar activePath={location.pathname} />
        </div>
        
        {/* Main content in rounded border box */}
        <div className="flex-grow lg:ml-6 w-full overflow-hidden">
          <div className="border border-gray-300 rounded-lg shadow-md h-full overflow-auto">
            <main className="p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      
      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default Layout;