import React from "react";
import bloomifyBlack from "../assets/logos/bloomify-black.png";
import Button from "../components/Button";
import Hero from "../sections/Hero";
import AboutBloomify from "../sections/AboutBloomify";
import TopProducts from "../sections/TopProducts";
import { Element } from 'react-scroll';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutBloomify />
      <TopProducts />
    </>
  );
};

export default Home;
