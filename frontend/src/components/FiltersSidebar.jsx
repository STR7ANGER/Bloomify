import React, { useState } from "react";

const FiltersSidebar = () => {
  // Initial states for all filters
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(10100);
  const [selectedColors, setSelectedColors] = useState([]);

  // Reset all filters when "Clear All" is clicked
  const clearFilters = () => {
    setSelectedGender("");         // Reset gender selection
    setSelectedCategories([]);     // Clear category selections
    setSelectedBrands([]);         // Clear brand selections
    setPriceRange(10100);          // Reset price slider
    setSelectedColors([]);         // Clear color selections
  };

  return (
    <aside className="w-64 p-4 border-gray-200 h-screen mt-40 ml-10">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">FILTERS</h3>
        {/* <hr className="w-full"/> */}
        <button onClick={clearFilters} className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded">
          CLEAR ALL
        </button>
      </div>

      {/* Gender Filter */}
      {/* <div className="mt-4 flex flex-col items-start">
        <h4 className="font-semibold">Gender</h4>
        {["Men", "Women", "Boys", "Girls"].map((item) => (
          <label key={item} className="block text-sm">
            <input
              type="radio"
              name="gender"
              checked={selectedGender === item}
              onChange={() => setSelectedGender(item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </div> */}

      {/* Categories */}
      <div className="mt-10 flex flex-col items-start">
        <h4 className="font-semibold text-sm uppercase mb-2">Seasons</h4>
        {["All","Spring","Summer", "Autumn", "Winter"].map((item) => (
          <label key={item} className="flex items-center justify-center text-sm tracking-wider p-2 text-gray-500">
            <input
              type="checkbox"
              checked={selectedCategories.includes(item)}
              onChange={() =>
                setSelectedCategories((prev) =>
                  prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
                )
              }
              className="mr-2 w-4 h-4 accent-red-500"
            />
            {item}
          </label>
        ))}
      </div>

      
      {/* Price */}
      {/* <div className="mt-4">
        <h4 className="font-semibold">Price</h4>
        <input
          type="range"
          min="100"
          max="900"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm">₹100 - ₹{priceRange}+</p>
      </div> */}

      {/* Color */}
      {/* <div className="mt-4 flex flex-col items-start">
        <h4 className="font-semibold text-sm uppercase mb-2">Color</h4>
        {[
          { color: "blue", name: "Blue (8831)" },
          { color: "white", name: "White (6580)" },
          { color: "yellow", name: "Yellow (5981)" },
          { color: "purple", name: "Purple (5981)" },
          { color: "red", name: "Red (5981)" },
          { name: "Green (5981)" },
        ].map(({ color, name }) => (
          <label key={name} className="items-center flex text-sm tracking-wider p-2 text-gray-500">
            <input
              type="checkbox"
              checked={selectedColors.includes(name)}
              onChange={() =>
                setSelectedColors((prev) =>
                  prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
                )
              }
              className="mr-2 w-4 h-4 accent-red-500"
            />
            <span
              className={`w-4 h-4 rounded-full border inline-block mr-2`}
              style={{ backgroundColor: color }}
            ></span>
            {name}
          </label>
        ))}
      </div> */}
    </aside>
  );
};

export default FiltersSidebar;
