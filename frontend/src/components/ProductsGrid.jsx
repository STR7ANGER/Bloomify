import React, { useState } from "react";
import DropdownButton from "./DropdownButton";
import TabMenu from "./TabMenu";
import {
  tabs,
  seasonalProducts,
  indoorProducts,
  toolsProducts,
  nutritionProducts,
  artProducts,
} from "../constants";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";

const ProductsGrid = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); // Default to first tab

  // Map tabs to corresponding product lists
  const tabProductData = {
    seasonal: seasonalProducts,
    indoor: indoorProducts,
    tools: toolsProducts,
    nutrition: nutritionProducts,
    art: artProducts,
  };

  // Get products based on selected tab
  const selectedProducts = tabProductData[activeTab] || [];

  // Only show sidebar when seasonal tab is active
  const showSidebar = activeTab === "seasonal";

  return (
    <section className={`${showSidebar ? "flex" : ""}`}>
      {/* Only render FiltersSidebar when on seasonal tab */}
      {showSidebar && <FiltersSidebar />}
      <div className={`mt-9 ${!showSidebar ? "mx-auto" : ""}`}>
        <div className="container mx-auto px-4 md:px-0">
          <div>
            <div className="p-6 justify-start">
              <TabMenu
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <hr className="flex-grow" />
              <div className="flex justify-end">
                <DropdownButton
                  title="Sort By"
                  options={["Flowers", "Plants"]}
                />
              </div>
            </div>
          </div>
          {/* Pass selectedProducts to ProductCard */}
          <ProductCard products={selectedProducts} />
          <hr className="my-10 w-full" />
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;