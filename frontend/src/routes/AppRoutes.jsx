import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import UserProfile from "../pages/UserProfile";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    // <ScrollToTop>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/order" element={<Orders />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="*" element={<Home />} /> {/* Fallback route */}
    </Routes>
    // </ScrollToTop>
  );
};

export default AppRoutes;
