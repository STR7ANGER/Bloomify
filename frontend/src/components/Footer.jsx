import React from "react";
import bloomifyWhite from "../assets/logos/bloomify-white.png";
import { Link } from "react-router-dom";
import { socials } from "../constants";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#181C3F] text-white">
        <div className="grid grid-cols-4">
          <div className="flex items-center justify-center">
            <img src={bloomifyWhite} alt="logo" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">Quick Links</h1>
              <Link to="/">
                <p className="font-extralight hover:underline">Home</p>
              </Link>
              <Link to="/about">
                <p className="font-extralight hover:underline">About</p>
              </Link>
              <Link to="/products">
                <p className="font-extralight hover:underline">Products</p>
              </Link>
              <Link to="/signup">
                <p className="font-extralight hover:underline">Sign Up | Login </p>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">RESOURCES</h1>
              <Link to="/">
                <p className="font-extralight hover:underline">Terms of Service</p>
              </Link>
              <Link to="/">
                <p className="font-extralight hover:underline">Refund Policy</p>
              </Link>
              <Link to="/">
                <p className="font-extralight hover:underline">Privacy Policy</p>
              </Link>
              <Link to="/contact">
                <p className="font-extralight hover:underline">Contact Us</p>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">
                CONNECT WITH US
              </h1>
              <a href="/" className="font-extralight">bloomify@gmail.com</a>
              <p className="font-extralight">(000) 1234567890</p>
              <p>Explore our social media channels.</p>
              <div className="flex space-x-7 mt-4">
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
