import React from "react";
import bloomifyWhite from "../assets/logos/bloomify-white.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#181C3F] text-white">
        <div className="grid grid-cols-4">
          <div className="flex items-center justify-center">
            <img src={bloomifyWhite} alt="" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">Quick Links</h1>
              <Link to="/">
                <div className="font-extralight">Home</div>
              </Link>
              <Link to="/about">
                <div className="font-extralight">About</div>
              </Link>
              <Link to="/products">
                <div className="font-extralight">Products</div>
              </Link>
              <Link to="/signup">
                <div className="font-extralight">Sign Up | Login </div>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <h1 className="text-lg uppercase font-semibold">
                CONNECT WITH US
              </h1>
              <p>Explore our social media channels.</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">RESOURCES</h1>
              <Link to="/">
                <div className="font-extralight">Terms of Service</div>
              </Link>
              <Link to="/">
                <div className="font-extralight">Refund Policy</div>
              </Link>
              <Link to="/">
                <div className="font-extralight">Privacy Policy</div>
              </Link>
              <Link to="/">
                <div className="font-extralight">Contact Us</div>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
