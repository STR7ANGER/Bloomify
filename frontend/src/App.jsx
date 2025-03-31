import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./components/CartContext";

const App = () => {
  const location = useLocation();

  return (
    <main className="scroll-hide">
      <CartProvider>

      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Nav />
      )}

      <div className="flex-grow">
        <AppRoutes />
      </div>
      
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
      </CartProvider>
    </main>
  );
};

export default App;
