import React from "react";
import { topProducts } from "../../constants";
import Button from "../../components/Button";

const TopProducts = () => {
  return (
    <section>
      <div className="container mx-auto my-10">
        <h2 className="text-5xl font-semibold">Top Products</h2>
        <hr className="my-10 w-full" />
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {topProducts.map(({ id, image, title, description }) => (
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 cursor-pointer group">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-60 object-cover rounded-t-lg transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4 relative h-28">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="absolute text-sm text-gray-500 mt-2 group-hover:-translate-y-5 group-hover:opacity-0 transition-all duration-300">
                  {description}
                </p>
                <div className="absolute flex items-center text-sm text-gray-500 mt-4 w-full opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                  <hr className="border-[1px] border-gray-400 w-10"/>
                  <p className="ml-2">Check Product</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-10 w-full" />
        <div className="flex justify-end">
          <Button className="flex-row-reverse" to="/products">
            See all products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
