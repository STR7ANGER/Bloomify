import { Link, useNavigate } from "react-router-dom";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { Menu, X, User, LogOut, ShoppingBag } from "lucide-react";
import Button_2 from "./Button_2";
import { navIcons } from "../constants";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserIconClick = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setShowUserDropdown(!showUserDropdown);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate("/");
  };

  return (
    <header>
      <div
        className={clsx(
          "fixed w-full py-8 bg-white transition-all duration-300 z-50 backdrop-blur-md",
          hasScrolled && "bg-white/80 bg-opacity-90 backdrop-blur-md"
        )}
      >
        <div className="relative">
          <div className="flex justify-between items-center py-4 px-8">
            <Link to="/" className="absolute w-80 h-auto flex items-center">
              <img
                src={bloomifyBlack}
                alt="logo"
                className="h-full object-contain"
              />
            </Link>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-16 lg:space-x-12 md:space-x-8 xl:flex hidden">
              <Link to="/products" className="text-xl">
                <Button_2>Products</Button_2>
              </Link>
              <Link to="/about" className="text-xl">
                <Button_2>About</Button_2>
              </Link>
              <Link to="/contact" className="text-xl">
                <Button_2>Contact</Button_2>
              </Link>
            </div>

            <div className="absolute right-8">
              <div className="max-xl:hidden">
                <nav className="flex justify-between items-center p-4">
                  <div className="flex items-center space-x-8">
                    {navIcons.map(({ id, Icon, label, path }) => {
                      // If the icon is a user icon, handle it differently
                      if (label === "Account") {
                        return (
                          <div key={id} className="relative" ref={dropdownRef}>
                            <button
                              onClick={handleUserIconClick}
                              className="p-2 rounded flex flex-col items-center justify-center text-gray-600 relative group"
                            >
                              <User size={28} />
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                                {currentUser ? "Profile" : "Login"}
                              </span>
                            </button>
                            
                            {/* User dropdown menu - only shown when logged in and dropdown is toggled */}
                            {currentUser && showUserDropdown && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                {/* User name */}
                                <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200">
                                  {currentUser.firstName} {currentUser.lastName}
                                </div>
                                
                                {/* Orders */}
                                <Link
                                  to="/order"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  onClick={() => setShowUserDropdown(false)}
                                >
                                  <ShoppingBag size={16} className="mr-2" />
                                  Orders
                                </Link>
                                
                                {/* Logout button */}
                                <button
                                  onClick={handleLogout}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <LogOut size={16} className="mr-2" />
                                  Logout
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      // For other icons, use the original code
                      return (
                        <Link
                          key={id}
                          to={path}
                          className="p-2 rounded flex flex-col items-center justify-center text-gray-600 relative group"
                        >
                          <Icon size={28} />
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                            {label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>

              <div className="xl:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                  <Menu size={28} />
                </button>
              </div>

              {isOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-white flex flex-col items-center justify-center text-black z-50">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-9 right-9"
                  >
                    <X size={48} />
                  </button>

                  <div className="text-2xl space-y-6 text-center uppercase">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      Products
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      Contact
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      Cart
                    </Link>
                    {currentUser ? (
                      <>
                        <Link
                          to="/order"
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className="block w-full"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        Login/Sign Up
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;