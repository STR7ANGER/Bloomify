import React from "react";
import { aboutUs } from "../constants";

const About = () => {
  return (
    <section className="pt-[6rem] bg-[url('././assets/backgrounds/hero-1.png')] bg-cover bg-center">
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-white" /> */}

      {/* Content Container */}

      <div className="container mx-auto relative z-10 px-6">
        {/* About Bloomify Section */}

        {/* Our Team Section */}
        <h1 class="text-6xl tracking-[0.3em] text-white mt-40 text-center max-sm:mt-20 max-sm:px-10">
          Our Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
          {aboutUs.map(({ id, pfp, who, work }) => (
            <div
              key={id}
              className="bg-white border border-gray-500 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={pfp} alt={who} className="w-full h-64 object-contain" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">{who}</h3>
                <p className="text-[#118B50] font-semibold">{work}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-white">
          <h3 className="text-4xl font-semibold text-[#85EBA0] mt-8 leading-[1.8em]">
            About Bloomify
          </h3>
          <h3 className="text-lg text-gray-300 mt-4">
            Cultivating Beauty, Creativity, and Growth
          </h3>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 text-center text-white">
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
            <p className="text-base text-gray-300">Flower Lovers Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
