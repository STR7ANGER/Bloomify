import React from "react";
import { topProducts } from "../../constants";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const TopProducts = () => {
  return (
    <section>
      <div className="container my-10 mx-auto px-4 md:px-0">
        <h2 className="text-5xl font-semibold">Top Products</h2>
        <hr className="my-10 w-full" />
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
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
                <h3 className="text-lg font-semibold text-gray-700 flex justify-start">
                  {title}
                </h3>
                <p className="absolute text-sm text-gray-400 mt-2 group-hover:-translate-y-5 group-hover:opacity-0 transition-all duration-300">
                  {description}
                </p>
                <div className="absolute flex items-center text-sm text-gray-400 mt-4 w-full opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                  <p className="mr-2 font-semibold">Show Product</p>
                  <hr className="border-[1px] border-gray-400 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-10 w-full" />
        <div className="flex justify-end">
          <Link to="/products">
            <Button className="flex-row-reverse" to="/products">
              See all products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
