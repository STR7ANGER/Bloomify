import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <main className="scroll-hide">
        <CartProvider>
          {location.pathname !== "/login" &&
            location.pathname !== "/signup" && <Nav />}

          <div className="flex-grow">
            <AppRoutes />
          </div>

          {location.pathname !== "/login" &&
            location.pathname !== "/signup" && <Footer />}
        </CartProvider>
      </main>
    </AuthProvider>
  );
};

export default App;