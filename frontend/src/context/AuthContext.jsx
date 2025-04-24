import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setToken(storedToken);
      
      // Configure axios default headers for authenticated requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        const userData = {
          id: response.data.userId,
          name: response.data.name,
          email: email
        };
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.token);
        
        // Set auth header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setCurrentUser(userData);
        setToken(response.data.token);
        
        return { success: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to login. Please try again." 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/register`, userData);
      
      if (response.data.success) {
        const user = {
          id: response.data.userId,
          name: response.data.name,
          email: userData.email
        };
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
        
        // Set auth header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setCurrentUser(user);
        setToken(response.data.token);
        
        return { success: true };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to register. Please try again." 
      };
    }
  };

  const logout = () => {
    // Remove user data and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setCurrentUser(null);
    setToken(null);
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;