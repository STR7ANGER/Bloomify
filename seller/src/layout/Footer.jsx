import bloomifyWhite from "../assets/logos/bloomify-white.png";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img src={bloomifyWhite} alt="Bloomify" className="w-48 h-auto mb-4" />
            <p className="text-sm text-gray-300">
              Connecting plant lovers with beautiful, sustainable gardening solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {["Add Items", "Orders", "Advertisement", "Inventory", "Dashboard"].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>Bloomify LLC</p>
              <p>123 Garden Street</p>
              <p>Green Valley, CA 94000</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@bloomify.com</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="space-y-3">
              {[
                { icon: FaInstagram, handle: "@bloomify", link: "#" },
                { icon: FaFacebook, handle: "bloomify", link: "#" },
                { icon: FaXTwitter, handle: "@bloomify", link: "#" }
              ].map(({ icon: Icon, handle, link }) => (
                <a 
                  key={handle} 
                  href={link} 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                  <span className="text-sm">{handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-emerald-800 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Bloomify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;