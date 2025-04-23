import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar activePath={location.pathname} />

      <div className="flex-grow w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;