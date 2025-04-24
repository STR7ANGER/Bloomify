import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState({
    flower: [],
    plant: [],
    art: [],
    tools: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    location: "all", // indoor/outdoor (for flower and plant)
    season: "all", // for plants and flowers
    category: "all", // for tools and art
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const response = await axios.get(`${API_URL}/api/products/all`);

        if (response.data.success) {
          setProducts(response.data.inventory);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on active category and filters
  const getFilteredProducts = () => {
    let itemsToFilter = [];

    if (activeCategory === "all") {
      itemsToFilter = [
        ...products.flower,
        ...products.plant,
        ...products.art,
        ...products.tools,
      ];
      // When in "all" category, ignore filters
      return itemsToFilter;
    } else {
      itemsToFilter = products[activeCategory] || [];
    }

    return itemsToFilter.filter((item) => {
      // Filter by location (for flower and plant)
      if (
        (item.type === "flower" || item.type === "plant") &&
        filters.location !== "all" &&
        item.inout !== filters.location
      ) {
        return false;
      }

      // Filter by season (for flower and plant)
      if (
        (item.type === "flower" || item.type === "plant") &&
        filters.season !== "all" &&
        item.season !== filters.season
      ) {
        return false;
      }

      // Filter by category (for art and tools)
      if (
        (item.type === "art" || item.type === "tools") &&
        filters.category !== "all" &&
        item.category !== filters.category
      ) {
        return false;
      }

      return true;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Get unique categories for filtering
  const getUniqueCategories = (type) => {
    if (!products[type]) return [];

    return [...new Set(products[type].map((item) => item.category))];
  };

  // Get unique seasons for filtering
  const getUniqueSeasons = (type) => {
    if (!products[type]) return [];

    return [...new Set(products[type].map((item) => item.season))];
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading products...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const filteredProducts = getFilteredProducts();

  // Get categories for tools and art
  const toolCategories = getUniqueCategories("tools");
  const artCategories = getUniqueCategories("art");

  return (
    <div className="container mx-auto mt-32 px-4 py-8">
      {/* Enhanced Horizontal Tab Navigation */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
          <nav className="flex overflow-x-auto">
            {["all", "flower", "plant", "art", "tools"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setFilters({
                    location: "all",
                    season: "all",
                    category: "all",
                  });
                }}
                className={`flex-1 py-4 px-6 text-center font-medium text-md transition-all duration-200 focus:outline-none ${
                  activeCategory === category
                    ? "text-pink-600 border-b-2 border-pink-500 bg-pink-50"
                    : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                }`}
              >
                {category === "all"
                  ? "All Products"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Category-specific Filters - Only shown when a specific category is selected */}
      {activeCategory !== "all" && (
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Location and Season filters for flower category */}
          {activeCategory === "flower" && (
            <>
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location:
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                >
                  <option value="all">All Locations</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season:
                </label>
                <select
                  value={filters.season}
                  onChange={(e) => handleFilterChange("season", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                >
                  <option value="all">All Seasons</option>
                  {getUniqueSeasons("flower").map((season) => (
                    <option key={season} value={season}>
                      {season.charAt(0).toUpperCase() + season.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Location and Season filters for plant category */}
          {activeCategory === "plant" && (
            <>
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location:
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                >
                  <option value="all">All Locations</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season:
                </label>
                <select
                  value={filters.season}
                  onChange={(e) => handleFilterChange("season", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                >
                  <option value="all">All Seasons</option>
                  {getUniqueSeasons("plant").map((season) => (
                    <option key={season} value={season}>
                      {season.charAt(0).toUpperCase() + season.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Category filter for art */}
          {activeCategory === "art" && (
            <div className="filter-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Art Type:
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
              >
                <option value="all">All Art</option>
                {artCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category filter for tools */}
          {activeCategory === "tools" && (
            <div className="filter-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tool Type:
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
              >
                <option value="all">All Tools</option>
                {toolCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products found for the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
