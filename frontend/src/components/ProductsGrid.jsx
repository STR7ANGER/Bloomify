import React from "react";
import { productsData } from "../constants";
import Button from "./Button";
import DropdownButton from "./DropdownButton";
import TabMenu from "./TabMenu";
import { tabs } from "../constants";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  return (
    <section>
      <div className="border border-gray-400 rounded-lg m-20">
        <div className="container mx-auto px-4 md:px-0">
          {/* <h2 className="text-5xl font-semibold">Top Products</h2> */}
          <div>
            <div className="p-6 justify-start">
              <TabMenu tabs={tabs} />
            </div>
            <div className="flex items-center gap-4 w-full">
              <hr className="flex-grow" />
              <div className="flex justify-end">
                <DropdownButton
                  title="Select Category"
                  options={["Flowers", "Plants", "Gifts"]}
                />
              </div>
            </div>
          </div>
          <ProductCard />
          <hr className="my-10 w-full" />
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
