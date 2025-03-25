import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const location = useLocation();

  return (
    <main className="scroll-hide">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Nav />
      )}

      <div className="flex-grow">
        <AppRoutes />
      </div>
      
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </main>
  );
};

export default App;
