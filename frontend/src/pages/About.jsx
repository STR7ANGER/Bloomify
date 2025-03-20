import React from "react";
import { aboutUs } from "../constants";

const About = () => {
  return (
    <section className="pt-[6rem] bg-hero ">
      <div class="container mx-auto">
        <h2 class="text-4xl font-bold text-center text-white my-12">
          Our Team
        </h2>
        <div class="grid grid-cols-3 gap-8">
          {aboutUs.map(({ id, pfp, linkedin, who, work }) => (
            <div
              key={id}
              className="bg-white border border-gray-500 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img src={pfp} alt={who} className="w-full h-64 object-contain" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{who}</h3>
                </div>
                <p className="text-[#118B50] font-semibold mb-4">{work}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
