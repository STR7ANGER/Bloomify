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
      <div className="flex flex-grow px-4 py-6">
        {/* Sidebar with fixed height */}
        <div className="hidden lg:block h-[calc(100vh-64px)]"> {/* Adjust 64px to match your navbar height */}
          <Sidebar activePath={location.pathname} />
        </div>
        
        {/* Main content in rounded border box */}
        <div className="flex-grow ml-4">
          <div className="border border-gray-300 rounded-lg shadow-md h-full overflow-auto">
            <main className="p-6">
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