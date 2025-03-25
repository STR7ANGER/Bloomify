import { Link } from "react-router-dom";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import Button from "../components/Button";

const Navbar = () => {
  return (
    <div className="w-full py-2 bg-white shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="w-52 h-auto flex items-center">
          <img
            src={bloomifyBlack}
            alt="logo"
            className="h-full object-contain"
          />
        </div>

        <div className="flex items-center">
          <Link to="/login">
            <Button className="bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-300">
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;