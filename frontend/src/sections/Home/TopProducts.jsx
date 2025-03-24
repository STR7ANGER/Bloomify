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
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-500">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{title}</h3>
              <p className="text-gray-500 mt-2">{description}</p>
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
