import React from "react";
import bloomifyWhite from "../assets/logos/bloomify-white.png";
import { Link } from "react-router-dom";
import { socials } from "../constants";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gradient-to-r from-black to-[#173f1f] text-white">
        <div className="grid grid-cols-4 max-lg:grid-cols-1 max-xl:gap-10 max-xl:py-20 max-xl:px-20 max-lg:text-center max-xl:grid-cols-3">
          <div className="flex items-center justify-center max-lg:hidden max-xl:hidden">
            <img src={bloomifyWhite} alt="logo" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">Quick Links</h1>
              <Link to="/">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Home</p>
              </Link>
              <Link to="/about">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">About</p>
              </Link>
              <Link to="/products">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Products</p>
              </Link>
              <Link to="/signup">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Sign Up | Login </p>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">RESOURCES</h1>
              <Link to="/">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Terms of Service</p>
              </Link>
              <Link to="/">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Refund Policy</p>
              </Link>
              <Link to="/">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Privacy Policy</p>
              </Link>
              <Link to="/contact">
                <p className="font-thin text-gray-400 hover:underline hover:text-white">Contact Us</p>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">
                CONNECT WITH US
              </h1>
              <a href="/" className="font-thin text-gray-400 hover:text-white">bloomify@gmail.com</a>
              <p className="font-thin text-gray-400 hover:text-white">(000) 1234567890</p>
              <p>Explore our social media channels.</p>
              <div className="flex space-x-7 mt-4 max-lg:justify-center">
                {socials.map(({ id, Icon, url}) => (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={32}/>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
