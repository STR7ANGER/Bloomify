import bloomifyWhite from "../assets/logos/bloomify-white.png";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gradient-to-r from-black to-[#173f1f]  text-white">
      <div className="container mx-16 py-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo */}
          <div className="w-full md:w-1/4">
            <img src={bloomifyWhite} alt="Bloomify" className="w-48 h-auto" />
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
            <ul className="text-xs space-y-1">
              <li><Link to="/add-items" className="text-gray-300 hover:text-white">Add Items</Link></li>
              <li><Link to="/orders" className="text-gray-300 hover:text-white">Orders</Link></li>
              <li><Link to="/advertisement" className="text-gray-300 hover:text-white">Advertisement</Link></li>
              <li><Link to="/inventory" className="text-gray-300 hover:text-white">Inventory</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-sm font-semibold mb-2">Contact Us</h3>
            <div className="text-xs text-gray-300 space-y-1">
              <p>Bloomify LLC</p>
              <p>123 Garden Street, Green Valley</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@bloomify.com</p>
            </div>
          </div>
          
          {/* Follow Us */}
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
            <div className="flex items-center space-x-2 mb-1">
              <FaInstagram size={16} />
              <span className="text-xs text-gray-300">@bloomify</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <FaFacebook size={16} />
              <span className="text-xs text-gray-300">@bloomify</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaXTwitter size={16} />
              <span className="text-xs text-gray-300">@bloomify</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-xs text-center text-gray-400">
            © {currentYear} Bloomify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;