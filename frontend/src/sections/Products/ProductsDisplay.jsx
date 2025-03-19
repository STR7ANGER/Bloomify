import React from "react";
import { contentData } from "../../constants";

const ProductsDisplay = () => {
  return (
    <div className="mt-12">
    
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
            className="w-full md:w-1/2 h-[16.75rem] rounded-lg shadow-lg border-[2px] border-[#67976c]"
            />

          {/* Text Content */}
          <div className="flex flex-col w-full md:w-1/2 bg-[#67976c] rounded-xl p-[2.2rem]">
            <h2 className="text-xl font-bold uppercase mb-2">{item.title}</h2>
            <p className="text-gray-100">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
      </div>
  );
};

export default ProductsDisplay;
