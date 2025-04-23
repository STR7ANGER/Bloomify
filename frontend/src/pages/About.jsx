import React from "react";
import { useState } from "react";
import { aboutUs } from "../constants";
import { motion } from "framer-motion";
import ProductsDisplay from "../sections/Products/ProductsDisplay";
import { TypeAnimation } from "react-type-animation";


const About = () => {
  const [activeSection, setActiveSection] = useState("story");
  return (
    <>
      <section className="min-h-screen mt-[3.5rem] flex justify-center bg-[url('././assets/backgrounds/hero-1.png')] bg-cover bg-center">
        <h1 class="text-6xl tracking-[0.3em] pt-20 text-white mt-32 text-center max-sm:mt-8 max-sm:px-10">
        <TypeAnimation
        sequence={["Where Every Petal Tells a Story", 5000]}
        wrapper="span"
        speed={3}
        repeat={0}
      />
        </h1>
      </section>
      <section>
        <div className="mx-auto">
          {/* Heading */}

          {/* Toggle Buttons */}
          <div className="relative flex flex-wrap justify-center gap-x-4 md:gap-x-40 lg:gap-x-64 mb-6 py-2">
            <button
              className="text-xl px-4 py-2 text-gray-700 relative"
              onClick={() => setActiveSection("story")}
            >
              Our Story
              {activeSection === "story" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-[2px] bg-gray-700 bottom-[-5px]"
                />
              )}
            </button>
            <button
              className="text-xl px-4 py-2 text-gray-700 relative"
              onClick={() => setActiveSection("team")}
            >
              Our Team
              {activeSection === "team" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-[2px] bg-gray-700 bottom-[-5px]"
                />
              )}
            </button>
          </div>

          {/* Sections */}
          <div className="p-6 rounded-lg shadow-lg">
            {activeSection === "story" && (
              <div id="our-story" className="text-center my-20">
                <h3 className="text-4xl font-semibold text-[#1E5128] my-10 leading-[1.8em] tracking-wider">
                  About Bloomify
                </h3>

                {/* <div className="object-contain h-auto w-[48rem] mx-auto">
                  <img src={heroBg} alt="about" />
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-14 text-center">
                  {/* Full-width heading */}

                  <p className="col-span-1 sm:col-span-2 text-lg text-gray-500 max-w-4xl mx-auto">
                    At Bloomify, we connect passionate florists with flower
                    lovers. Whether you're looking to brighten someone's day or
                    grow your floral business, our platform makes buying and
                    selling flowers effortless and delightful.
                  </p>

                  {/* Stats Section (Centered on all devices) */}
                  <div>
                    <h4 className="text-2xl font-bold">500+ Unique</h4>
                    <p className="text-base text-gray-500">Flower varieties</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">5+ Years</h4>
                    <p className="text-base text-gray-500">Of Excellence</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">Seamless</h4>
                    <p className="text-base text-gray-500">
                      Buying & Selling Experience
                    </p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">Connecting</h4>
                    <p className="text-base text-gray-500">
                      Flower Lovers Worldwide
                    </p>
                  </div>
                </div>
                  <hr className="w-1/2 mx-auto my-20"/>
                {/* Products Display */}

                <div className="text-center min-h-screen">
                  <p className="min-w-6xl text-4xl font-bold text-gray-600">
                    "Where flowers bloom, so does happiness – let nature’s
                    beauty find a home with you."
                  </p>
                  <ProductsDisplay />
                </div>
              </div>
            )}

            {activeSection === "team" && (
              <div id="our-team" className="mt-10 mb-20">
                <div className="container mx-auto">
                  <h3 className="text-xl text-center text-gray-500 mb-20">
                    Cultivating Beauty, Creativity, and Growth
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aboutUs.map(({ id, pfp, who, work }) => (
                      <div
                        key={id}
                        className="bg-white border border-gray-500 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                      >
                        <img
                          src={pfp}
                          alt={who}
                          className="w-full h-[30rem] object-cover mx-auto"
                        />
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {who}
                            </h3>
                          </div>
                          <p className="text-[#118B50] font-semibold mb-4">
                            {work}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
