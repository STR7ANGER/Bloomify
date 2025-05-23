import React from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import Button from "../components/Button";
import Hero from "../sections/Home/Hero";
import AboutBloomify from "../sections/Home/AboutBloomify";
import TopProducts from "../sections/Home/TopProducts";
import { Element } from 'react-scroll';
import BecomeSeller from "../sections/Home/BecomeSeller";

const Home = () => {
  return (
    <div className="pt-[6rem]">
      <Hero />
      <AboutBloomify />
      <TopProducts />
      <BecomeSeller />
    </div>
  );
};

export default Home;
