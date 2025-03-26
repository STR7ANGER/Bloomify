import React from "react";
import leftSide from "../../assets/backgrounds/left-side.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useState, useEffect } from "react";
// ././assets/backgrounds/green-box.png

const AboutBloomify = () => {
  return (
    <div className="relative min-h-screen flex justify-center my-40 items-center px-10 bg-[url('././assets/backgrounds/green-box.png')] bg-cover bg-center">
      {/* Borders */}
      <div className="absolute top-0 w-3/4 h-[1px] bg-[#173f1f]"></div>
      <div className="absolute top-20 left-0 ml-40 h-1/2 w-[1px] bg-[#173f1f] max-2xl:hidden"></div>
      <div className="absolute bottom-20 right-0 mr-40 h-1/2 w-[1px] bg-[#173f1f] max-2xl:hidden"></div>
      <div className="absolute bottom-0 w-3/4 h-[1px] bg-[#173f1f]"></div>
      {/* Content */}
      <div className="relative text-black text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl max-sm:text-3xl min-lg:text-4xl font-semibold leading-[1.3em]">
          Where Flowers Find Their Home
        </h2>
        <p className="text-xl mt-4 font-medium text-gray-500 max-sm:text-base">
          At Bloomify, we connect passionate florists with flower lovers.
          Whether you're looking to brighten someone's day or grow your floral
          business, our platform makes buying and selling flowers effortless and
          delightful.
        </p>

        <div className="mt-8">
          <Button href="/about">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutBloomify;
