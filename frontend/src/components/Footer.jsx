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
            <img src={bloomifyWhite} alt="" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">Quick Links</h1>
              <Link to="/">
                <div className="font-extralight hover:underline">Home</div>
              </Link>
              <Link to="/about">
                <div className="font-extralight hover:underline">About</div>
              </Link>
              <Link to="/products">
                <div className="font-extralight hover:underline">Products</div>
              </Link>
              <Link to="/signup">
                <div className="font-extralight hover:underline">Sign Up | Login </div>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">
                CONNECT WITH US
              </h1>
              <p>Explore our social media channels.</p>
              <div className="flex space-x-7 mt-5">
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
          <div className="flex items-center justify-center">
            <div className="flex flex-col leading-10">
              <h1 className="text-lg uppercase font-semibold">RESOURCES</h1>
              <Link to="/">
                <div className="font-extralight hover:underline">Terms of Service</div>
              </Link>
              <Link to="/">
                <div className="font-extralight hover:underline">Refund Policy</div>
              </Link>
              <Link to="/">
                <div className="font-extralight hover:underline">Privacy Policy</div>
              </Link>
              <Link to="/contact">
                <div className="font-extralight hover:underline">Contact Us</div>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
