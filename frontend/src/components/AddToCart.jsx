import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddToCart = ({ product, quantity = 1 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user ID from localStorage with better validation
  const getUserId = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      return user && user.id ? user.id : null;
    } catch (err) {
      console.error("Error parsing user data:", err);
      return null;
    }
  };

  // Get token with validation
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token && token.length > 10 ? token : null;
  };

  const handleAddToCart = async () => {
    setError(null);
    
    // Validate product
    if (!product || !product._id) {
      setError("Invalid product data");
      return;
    }
    
    // Check stock
    if (product.quantity < 1) {
      setError("Product is out of stock");
      return;
    }
 
    // Validate quantity
    if (quantity <= 0 || quantity > product.quantity) {
      setError(`Please select a valid quantity (1-${product.quantity})`);
      return;
    }
    
    const userId = getUserId();
    const token = getToken();
    
    // Check if user is logged in with proper credentials
    if (!userId || !token) {
      // Save intended product to localStorage for potential redirect after login
      localStorage.setItem("pendingCartAdd", JSON.stringify({
        productId: product._id,
        quantity: quantity
      }));
      
      // Redirect to login page with return URL
      navigate(`/login?redirect=/products/details/${product._id}`);
      return;
    }

    try {
      setIsLoading(true);
      
      const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      
      // Include userId in the request body
      const response = await axios.post(
        `${API_URL}/api/cart/add`,
        {
          userId: userId,
          productId: product._id,
          productType: product.type,
          quantity: parseInt(quantity)
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.success) {
        alert("Added to cart successfully!");
        
        // Optional: Update local cart count if you have app-wide state
        // Example: dispatch({ type: 'UPDATE_CART_COUNT' });
      } else {
        throw new Error(response.data?.message || "Failed to add item to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      
      if (err.response) {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          setError("Your session has expired. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response.status === 400) {
          setError(err.response.data?.message || "Invalid request data");
        } else {
          setError(err.response.data?.message || "Server error occurred");
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(err.message || "Error adding item to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading || product.quantity <= 0}
        className={`w-full py-3 px-6 text-white font-medium rounded flex items-center justify-center ${
          product.quantity > 0
            ? isLoading 
              ? "bg-green-400" 
              : "bg-green-600 hover:bg-green-700 transition-colors"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : product.quantity > 0 ? (
          `Add to Cart (${quantity})`
        ) : (
          "Out of Stock"
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToCart;