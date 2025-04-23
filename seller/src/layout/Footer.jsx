import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="h-8 w-8 text-emerald-400" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-2 text-xl font-bold">Bloomify</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Connecting plant lovers with beautiful, sustainable gardening solutions since 2020.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: FaInstagram, ariaLabel: "Instagram" },
                { icon: FaFacebook, ariaLabel: "Facebook" },
                { icon: FaXTwitter, ariaLabel: "Twitter" }
              ].map(({ icon: Icon, ariaLabel }) => (
                <a 
                  key={ariaLabel} 
                  href="#" 
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label={ariaLabel}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {["Add Items", "Orders", "Advertisement", "Inventory", "Dashboard"].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {["Gardening Guide", "Plant Care Tips", "Sustainability", "Blog", "FAQ"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <address className="mt-4 not-italic text-sm text-gray-400 space-y-2">
              <p>Bloomify LLC</p>
              <p>123 Garden Street</p>
              <p>Green Valley, CA 94000</p>
              <p className="mt-4">
                <a href="tel:+15551234567" className="hover:text-emerald-400">
                  (555) 123-4567
                </a>
              </p>
              <p>
                <a href="mailto:info@bloomify.com" className="hover:text-emerald-400">
                  info@bloomify.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {currentYear} Bloomify. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-xs text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;