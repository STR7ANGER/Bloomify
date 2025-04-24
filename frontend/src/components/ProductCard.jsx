import {  useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Default image if none is provided
  const defaultImage = "https://via.placeholder.com/300x300?text=No+Image";

  // Format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get background color based on product type
  const getTagColor = (type, value) => {
    if (type === "type") {
      switch (value) {
        case "flower":
          return "bg-pink-100 text-pink-800";
        case "plant":
          return "bg-green-100 text-green-800";
        case "art":
          return "bg-purple-100 text-purple-800";
        case "tools":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else if (type === "location") {
      switch (value) {
        case "indoor":
          return "bg-blue-100 text-blue-800";
        case "outdoor":
          return "bg-amber-100 text-amber-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else if (type === "season") {
      switch (value) {
        case "spring":
          return "bg-green-100 text-green-800";
        case "summer":
          return "bg-yellow-100 text-yellow-800";
        case "autumn":
          return "bg-orange-100 text-orange-800";
        case "winter":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-purple-100 text-purple-800";
      }
    } else if (type === "category") {
      switch (value) {
        case "hand tools":
          return "bg-amber-100 text-amber-800";
        case "power tools":
          return "bg-red-100 text-red-800";
        case "vase":
          return "bg-indigo-100 text-indigo-800";
        case "pot":
          return "bg-yellow-100 text-yellow-800";
        case "bouquet":
          return "bg-pink-100 text-pink-800";
        case "crafts":
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    return "bg-gray-100 text-gray-800";
  };

  // Handle card click - store product type in sessionStorage before navigating
  const handleCardClick = (e) => {
    e.preventDefault(); // Prevent default Link behavior
    // Store the product type in sessionStorage for use on the details page
    sessionStorage.setItem("lastProductType", product.type);
    // Navigate to product details page
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="group" onClick={handleCardClick}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image?.[0] || defaultImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.quantity <= 3 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              LOW STOCK
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <span className="font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {/* Type tag */}
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                "type",
                product.type
              )}`}
            >
              {product.type}
            </span>

            {/* Location tag (for plants and flowers) */}
            {(product.type === "plant" || product.type === "flower") &&
              product.inout && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                    "location",
                    product.inout
                  )}`}
                >
                  {product.inout}
                </span>
              )}

            {/* Season tag (for plants and flowers) */}
            {(product.type === "plant" || product.type === "flower") &&
              product.season && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                    "season",
                    product.season
                  )}`}
                >
                  {product.season}
                </span>
              )}

            {/* Category tag (for art and tools) */}
            {(product.type === "art" || product.type === "tools") &&
              product.category && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                    "category",
                    product.category
                  )}`}
                >
                  {product.category}
                </span>
              )}
          </div>

          {/* Brief description - first line only */}
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {product.description ? product.description.split("\n")[0] : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.array,
    quantity: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    inout: PropTypes.string,
    season: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
