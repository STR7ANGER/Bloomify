import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create cart context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      
      // Get user ID from local storage
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

      const userId = getUserId();
      
      if (!userId) {
        setCart([]);
        setLoading(false);
        return;
      }

      // Get JWT token from local storage
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Transform cart items from object format to array format
        const cartItems = response.data.cartItems.map(item => ({
          id: item.cartItemId,
          title: item.name,
          image: item.image,
          price: `$${item.price.toFixed(2)}`,
          quantity: item.quantity,
          productId: item.productId,
          productType: item.productType
        }));
        
        setCart(cartItems);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error.response?.data?.message || "Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      // Get user ID from local storage
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

      const userId = getUserId();
      const token = localStorage.getItem("token");
      
      if (!userId || !token) {
        setError("Authentication required");
        return false;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/cart/add`,
        {
          userId,
          productId: product._id,
          productType: product.type,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Refresh cart after adding item
        fetchCartItems();
        return true;
      } else {
        setError(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.response?.data?.message || "Failed to add item to cart");
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      // Get user ID from local storage
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

      const userId = getUserId();
      const token = localStorage.getItem("token");
      
      if (!userId || !token) {
        setError("Authentication required");
        return false;
      }

      const response = await axios.delete(
        `${BACKEND_URL}/api/cart/${userId}/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update local cart state by removing the item
        setCart(cart.filter(item => item.id !== itemId));
        return true;
      } else {
        setError(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError(error.response?.data?.message || "Failed to remove item from cart");
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      // Get user ID from local storage
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

      const userId = getUserId();
      const token = localStorage.getItem("token");
      
      if (!userId || !token) {
        setError("Authentication required");
        return false;
      }

      const response = await axios.put(
        `${BACKEND_URL}/api/cart/${userId}/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update local cart state with new quantity
        setCart(cart.map(item => 
          item.id === itemId 
            ? { ...item, quantity } 
            : item
        ));
        return true;
      } else {
        setError(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      setError(error.response?.data?.message || "Failed to update cart");
      return false;
    }
  };

  // Clear cart (custom function)
  const clearCart = async () => {
    try {
      // Since there's no direct API for clearing cart, we'll remove items one by one
      // Get user ID from local storage
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

      const userId = getUserId();
      const token = localStorage.getItem("token");
      
      if (!userId || !token) {
        setError("Authentication required");
        return false;
      }

      // Create an array of promises to remove each item
      const removePromises = cart.map(item => 
        axios.delete(`${BACKEND_URL}/api/cart/${userId}/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      await Promise.all(removePromises);
      
      // Clear local cart state
      setCart([]);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError(error.response?.data?.message || "Failed to clear cart");
      return false;
    }
  };

  // Make cart context values available to components
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart: fetchCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};