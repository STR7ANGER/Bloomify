import React, { useState } from "react";
import { motion } from "framer-motion";

const FiltersSidebar = () => {
  // Initial states for all filters
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(10100);
  const [selectedColors, setSelectedColors] = useState([]);

  // Reset all filters when "Clear All" is clicked
  const clearFilters = () => {
    setSelectedGender(""); // Reset gender selection
    setSelectedCategories([]); // Clear category selections
    setSelectedBrands([]); // Clear brand selections
    setPriceRange(10100); // Reset price slider
    setSelectedColors([]); // Clear color selections
  };

  return (
    <motion.aside 
      className="w-64 p-4 border-gray-200 h-screen mt-40 ml-10"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">FILTERS</h3>
        <button
          onClick={clearFilters}
          className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Categories */}
      <div className="mt-10 flex flex-col items-start">
        <h4 className="font-semibold text-sm uppercase mb-2">Seasons</h4>
        {["All", "Spring", "Summer", "Autumn", "Winter"].map((item) => (
          <label
            key={item}
            className="flex items-center justify-center text-sm tracking-wider p-2 text-gray-500"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(item)}
              onChange={() =>
                setSelectedCategories((prev) =>
                  prev.includes(item)
                    ? prev.filter((c) => c !== item)
                    : [...prev, item]
                )
              }
              className="mr-2 w-4 h-4 accent-red-500"
            />
            {item}
          </label>
        ))}
      </div>
    </motion.aside>
  );
};

export default FiltersSidebar;