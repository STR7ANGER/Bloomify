import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar  />

      <div className="flex-grow w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;