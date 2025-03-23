import { Link } from "react-router-dom";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import Button from "../components/Button";

const Navbar = () => {
  return (
    <div className="w-full py-1  bg-white border-b">
      <div className="flex justify-between items-center px-8">
        <div className=" w-52 h-auto flex items-center">
          <img
            src={bloomifyBlack}
            alt="logo"
            className="h-full object-contain"
          />
        </div>

        <div className="flex items-center">
          <Link to="/login">
            <Button>Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;