import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes for validation

// Create context
const AuthContext = createContext();

// Backend URL from environment variables
const BackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
          // Set default auth header for all future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
          // Handle invalid JSON in localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          console.error("Invalid user data in localStorage", err);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Register function
  const register = async (formData) => {
    try {
      setError(null);
      
      // Transform formData to match backend expectations with correct spelling (comapnyEmail)
      const sellerData = {
        name: formData.name,
        comapnyEmail: formData.companyEmail, // Match the backend field name with typo
        companyNumber: formData.companyNumber,
        password: formData.password,
        companyName: formData.companyName,
        companyAddress: {
          street: formData.companyAddress.street,
          city: formData.companyAddress.city,
          state: formData.companyAddress.state,
          pincode: formData.companyAddress.zipCode, // Match backend field name
          country: formData.companyAddress.country
        },
        upi: formData.upi
      };
      
      console.log("Sending registration data:", sellerData);
      const response = await axios.post(`${BackendUrl}/api/seller/register`, sellerData);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        
        const userData = {
          sellerId: response.data.sellerId,
          name: response.data.name,
          companyName: response.data.companyName,
          companyEmail: response.data.comapnyEmail, // Store with consistent naming in our app
          companyNumber: response.data.companyNumber
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set default auth header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setCurrentUser(userData);
        return { success: true };
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error("Registration error:", err);
      return { success: false, message: errorMessage };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      
      // Use the field name with typo as in backend
      const response = await axios.post(`${BackendUrl}/api/seller/login`, {
        comapnyEmail: email, // Match the backend field name with typo
        password
      });
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        
        const userData = {
          sellerId: response.data.sellerId,
          name: response.data.name,
          companyName: response.data.companyName,
          companyEmail: response.data.comapnyEmail, // Store with consistent naming in our app
          companyNumber: response.data.companyNumber
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set default auth header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setCurrentUser(userData);
        return { success: true };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error("Login error:", err);
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser && !!localStorage.getItem('token');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;