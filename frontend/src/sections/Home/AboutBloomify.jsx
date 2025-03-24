import React from "react";
import leftSide from "../../assets/backgrounds/left-side.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useState, useEffect} from "react";
// ././assets/backgrounds/green-box.png

const AboutBloomify = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.7 1"], // Effect starts when 80% of the section is visible
  });

  // Scale up from 0.8 to 1 (Pop-Out Effect)
  const scale = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex justify-center my-40 items-center px-10 bg-[url('././assets/backgrounds/green-box.png')] bg-cover bg-center"
    >
      <div className="absolute top-0 w-3/4 h-[4px] bg-[#173f1f]"></div>
      <div className="absolute top-20 left-0 ml-40 h-1/2 w-[4px] bg-[#173f1f] max-2xl:hidden"></div>
      <div className="absolute bottom-20 right-0 mr-40 h-1/2 w-[4px] bg-[#173f1f] max-2xl:hidden"></div>
      <div className="absolute bottom-0 w-3/4 h-[4px] bg-[#173f1f]"></div>
{/* Content Box with Pop-Out Effect */}
      <motion.div
        style={{ scale, y: translateY }} // Adds the pop-out effect
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="relative text-black text-center max-w-3xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl max-sm:text-3xl min-lg:text-4xl font-semibold leading-[1.3em]">
          Where Flowers Find Their Home
        </h2>
        <p className="text-xl mt-4 font-medium text-gray-500 max-sm:text-base">
          At Bloomify, we connect passionate florists with flower lovers.
          Whether you're looking to brighten someone's day or grow your
          floral business, our platform makes buying and selling flowers
          effortless and delightful.
        </p>

        {/* <h3 className="text-4xl font-semibold text-[#85EBA0] mt-8 leading-[1.8em]">
          About Bloomify
        </h3> */}

        {/* <div className="grid grid-cols-2 gap-6 mt-4">
          <h3 className="col-span-2 text-lg text-gray-300">
            Cultivating Beauty, Creativity, and Growth
          </h3>
          <div>
            <h4 className="text-2xl font-bold">500+ Unique</h4>
            <p className="text-base text-gray-300">Flower varieties</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold">5+ Years</h4>
            <p className="text-base text-gray-300">Of Excellence</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold">Seamless</h4>
            <p className="text-base text-gray-300">
              Buying & Selling Experience
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold">Connecting</h4>
            <p className="text-base text-gray-300">
              Flower Lovers Worldwide
            </p>
          </div>
        </div> */}

        {/* Button with Pop-Out Scroll Effect */}
          <motion.div
            style={{ scale, y: translateY }}
            transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
            className="mt-8"
          >
            <Button href="/about">
              Learn More
            </Button>
          </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutBloomify;
