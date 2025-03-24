import React from "react";
import { contentData } from "../../constants";
import { motion } from "framer-motion";

const ProductsDisplay = () => {
  return (
    <div className="relative my-12">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "50%" }}
        transition={{ duration: 1, delay: 0.2  }}
        className="absolute top-0 right-[10rem] w-[1px] bg-[#173f1f] max-2xl:hidden"
      ></motion.div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "25%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 ml-40 h-[1px] bg-[#173f1f]"
      ></motion.div>

      {/* Left & Right Vertical Borders */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "25%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 ml-40 w-[1px] bg-[#173f1f] max-2xl:hidden"
      ></motion.div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "25%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 mr-40 w-[1px] bg-[#173f1f] max-2xl:hidden"
      ></motion.div>

      {/* Bottom Borders */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "50%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-[10rem] w-[1px] bg-[#173f1f] max-2xl:hidden"
      ></motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "25%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 mr-40 h-[1px] bg-[#173f1f]"
      ></motion.div>

      <div className="max-w-7xl mx-auto py-10 space-y-16 rounded-3xl p-10">
        {contentData.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full md:w-1/2 h-[16.75rem] rounded-lg shadow-lg"
            />

            {/* Text Content */}
            <div className="flex flex-col w-full md:w-1/2 rounded-xl p-[2.2rem]">
              <h2 className="text-xl font-bold uppercase mb-4">{item.title}</h2>
              <hr />
              <p className="text-gray-500 mt-4">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsDisplay;
