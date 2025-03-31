import React from "react";
import Button from "../../components/Button";
import { RiVisaLine } from "react-icons/ri";
import logoBloomify from "../../assets/logos/bloomify-black.png";
import logo from "../../assets/logos/logo-black.png";

const BecomeSeller = () => {
  return (
    <>
    <section className="flex lg:hidden items-center container mx-auto justify-center my-20">
      <div className="flex flex-col items-center justify-center text-center gap-10 bg-gray-100 border border-gray-300 rounded-3xl py-16 px-6 shadow-lg">
      <img
          src={logo}
          alt="BloomifyLogo"
          className="w-48"
        />
      <h1 className="text-6xl font-bold">
          Become a <br /> <span className="text-[#118B50]">Seller</span>
        </h1>
        <p className="mt-4 w-2/3 text-xl text-gray-500">
          Join thousands of independent sellers and grow your business with us.
        </p>
        <div className="mt-6 flex gap-4">
          <Button className="mb-5">Get Started</Button>
        </div>
        <p className="mt-2 text-gray-600 text-xs">
          First month FREE + $3.99 / month
        </p>
    </div>
    </section>
    <section className="relative bg-gray-100 border border-gray-300 rounded-3xl my-20 py-16 lg:flex flex-col md:flex-row items-center justify-between container mx-auto shadow-lg hidden">
      <div className="px-6 md:px-20 py-40 xs:flex xs:items-center xs:justify-center xs:text-center xs:gap-10">
        <img
          src={logoBloomify}
          alt="Bloomify"
          className="absolute top-14 left-5 w-96"
        />
        <img
          src={logo}
          alt="BloomifyLogo"
          className="absolute top-10 right-14 w-48 hidden lg:flex"
        />
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
          Become a <br /> <span className="text-[#118B50]">Seller</span>
        </h1>
        <p className="mt-4 text-gray-500">
          Join thousands of independent sellers and grow your business with us.
        </p>
        <div className="mt-6 flex gap-4">
          <Button className="mb-5">Get Started</Button>
        </div>
        <p className="mt-2 text-gray-600 text-xs">
          First month FREE + $3.99 / month
        </p>
      </div>
      <div>
        {/* <RiBarcodeLine size={60} className="absolute bottom-[100px] left-[60px]" /> */}
        <p className="uppercase tracking-[0.3em] font-medium absolute bottom-[110px] left-[70px] text-3xl orbitron text-gray-800">
          welcome to bloomify mr. seller
        </p>
        <div className="absolute bottom-[60px] left-[100px]">
          <div className="grid grid-cols-2">
            <div className="flex items-start flex-col uppercase tracking-[0.3em] text-xs text-gray-500">
              <p>valid</p>
              <p>thru</p>
            </div>
            <div className="orbitron text-2xl text-gray-400">04/27</div>
          </div>
        </div>
    {/* <p className="absolute bottom-10 left-[100px] uppercase text-gray-400 tracking-[1em] my-10 text-center">list &middot; sell &middot; earn</p> */}
      </div>
      <div className="xl:flex flex-col items-center justify-center hidden">
        <div className="absolute bottom-0 right-[60px] mt-10 md:mt-0">
          <RiVisaLine size={250} className="text-gray-800"/>
        </div>
        <p className="absolute bottom-10 right-[50px] tracking-[0.6em] uppercase text-2xl text-gray-500">platinum</p>
      </div>
    </section>
    </>
  );
};

export default BecomeSeller;
