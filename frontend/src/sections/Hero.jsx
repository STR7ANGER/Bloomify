import React from "react";
import pageBg from "../assets/backgrounds/page-bg.png";
import { Element } from "react-scroll";

const Hero = () => {
  return (
    <section className="pt-20">
      <Element title="">
        <div className="h-[calc(100vh-80px)] flex justify-center bg-[url('./assets/backgrounds/hero-1.png')] bg-cover bg-center">
          <div className="flex flex-col">
            <h1 class="text-6xl tracking-[0.3em] text-white mt-40">
              Welcome to Bloomify
            </h1>
            {/* <p class="mt-4 text-lg">Your amazing tagline goes here.</p> */}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
