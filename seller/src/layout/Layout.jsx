import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-grow container mx-auto px-4 py-6 max-w-full">
        <div className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto h-[calc(100vh-64px)] sticky top-16"> 
          <Sidebar activePath={location.pathname} />
        </div>
        
        <div className="flex-grow lg:ml-6 w-full overflow-hidden">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 h-full overflow-auto">
            <main className="p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;