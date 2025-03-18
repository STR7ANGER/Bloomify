import React from "react";
import leftSide from "../assets/backgrounds/left-side.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const AboutBloomify = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      <div className="grid grid-cols-2 justify-center items-center">
        <div className="flex justify-center items-center">
          <img src={leftSide} alt="left-image" />
        </div>
        <div className="flex justify-center items-center px-10">
          <div className="my-[5rem]">
            <h2 className="text-5xl text-black font-medium leading-[1.3em]">
              Where Flowers <br /> Find Their <br /> Home
            </h2>
            <hr className="border-gray-600" />
            <p className="text-xl mt-4 text-gray-600">
              At Bloomify, we connect passionate florists with flower lovers.
              Whether you're looking to brighten someone's day or grow your
              floral business, our platform makes buying and selling flowers
              effortless and delightful.
            </p>
            <h3 className="text-4xl font-medium text-[#F0394D] mt-8 leading-[1.8em]">
              About Bloomify
            </h3>
            <hr className="border-gray-600" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <h3 className="col-span-2 text-lg text-gray-400">
                Cultivating Beauty, Creativity, and Growth
              </h3>
              <div>
                <h4 className="text-2xl font-bold">500+ Unique</h4>
                <p className="text-base text-gray-600">Flower varieties</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">5+ Years</h4>
                <p className="text-base text-gray-600">Of Excellence</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Seamless</h4>
                <p className="text-base text-gray-600">
                  Buying & Selling Experience
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Connecting</h4>
                <p className="text-base text-gray-600">
                  Flower Lovers Worldwide
                </p>
              </div>
            </div>
            <Link to="/about">
              <div className="mt-8">
                <Button className>Learn More</Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBloomify;
