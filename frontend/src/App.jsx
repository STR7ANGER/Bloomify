import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <main className="scroll-hide">
        <CartProvider>
          <WishlistProvider>
            {location.pathname !== "/login" &&
              location.pathname !== "/signup" && <Nav />}

            <div className="flex-grow">
              <AppRoutes />
            </div>

            {location.pathname !== "/login" &&
              location.pathname !== "/signup" && <Footer />}
          </WishlistProvider>
        </CartProvider>
      </main>
    </AuthProvider>
  );
};

export default App;