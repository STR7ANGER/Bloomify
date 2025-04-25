import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddToCart from "../components/AddToCart"; // Import the AddToCart component

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);


  // Format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Get product details from the backend
        const API_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const productType = sessionStorage.getItem("lastProductType") || "";
        const response = await axios.get(
          `${API_URL}/api/products/details/${productId}${
            productType ? `?type=${productType}` : ""
          }`
        );

        if (response.data.success) {
          setProduct(response.data.product);
          // Reset quantity to 1 whenever product changes
          setQuantity(1);

          // Fetch recommended products
          
        } else {
          setError("Failed to fetch product details");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("An error occurred while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);



  // Get tag color for display
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

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-gray-600 text-xl mb-4">Product not found</div>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-32 px-4 py-8">
      {/* Product Details Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="h-96 overflow-hidden">
              <img
                src={
                  product.image?.[0] ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail gallery if there are multiple images */}
            {product.image && product.image.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto p-2">
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-20 w-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-green-500"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Type tag */}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getTagColor(
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
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getTagColor(
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
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getTagColor(
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
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getTagColor(
                      "category",
                      product.category
                    )}`}
                  >
                    {product.category}
                  </span>
                )}
            </div>

            {/* Stock info */}
            <div className="mt-4">
              {product.quantity > 0 ? (
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      product.quantity <= 3 ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  <span
                    className={`text-sm font-medium ${
                      product.quantity <= 3 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {product.quantity <= 3
                      ? `Low Stock (${product.quantity} left)`
                      : `In Stock (${product.quantity} available)`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                  <span className="text-sm font-medium text-red-500">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-gray-600 whitespace-pre-line">
                {product.description || "No description available."}
              </div>
            </div>

            {/* Simple Quantity Selector */}
            {product.quantity > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="w-10 h-10 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl font-bold">-</span>
                  </button>

                  <div className="w-16 h-10 bg-gray-100 flex items-center justify-center border-t border-b border-gray-300">
                    <span className="font-bold text-gray-800">{quantity}</span>
                  </div>

                  <button
                    onClick={handleIncreaseQuantity}
                    className="w-10 h-10 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300"
                    disabled={quantity >= product.quantity}
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Total: {formatPrice(product.price * quantity)}
                </div>
              </div>
            )}

            {/* Replace the old add to cart button with our new component */}
            <div className="mt-8">
              <AddToCart product={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Details & Specifications */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - specifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Specifications
            </h3>
            <div className="space-y-2">
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-medium w-1/3 text-gray-600">
                  Product ID
                </span>
                <span className="text-gray-800">{product._id}</span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-medium w-1/3 text-gray-600">Type</span>
                <span className="text-gray-800">{product.type || "N/A"}</span>
              </div>
              {(product.type === "plant" || product.type === "flower") && (
                <>
                  <div className="flex border-b border-gray-200 py-2">
                    <span className="font-medium w-1/3 text-gray-600">
                      Location
                    </span>
                    <span className="text-gray-800">
                      {product.inout || "N/A"}
                    </span>
                  </div>
                  <div className="flex border-b border-gray-200 py-2">
                    <span className="font-medium w-1/3 text-gray-600">
                      Season
                    </span>
                    <span className="text-gray-800">
                      {product.season || "N/A"}
                    </span>
                  </div>
                </>
              )}
              {(product.type === "art" || product.type === "tools") && (
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-medium w-1/3 text-gray-600">
                    Category
                  </span>
                  <span className="text-gray-800">
                    {product.category || "N/A"}
                  </span>
                </div>
              )}
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-medium w-1/3 text-gray-600">Price</span>
                <span className="text-gray-800">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex py-2">
                <span className="font-medium w-1/3 text-gray-600">
                  Availability
                </span>
                <span
                  className={`${
                    product.quantity > 0 ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {product.quantity > 0
                    ? `In Stock (${product.quantity})`
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Right column - care information or usage */}
          <div>
            {product.type === "plant" || product.type === "flower" ? (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Care Instructions
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <span className="font-medium">Watering:</span>{" "}
                    {product.care?.watering ||
                      "Water regularly, allowing soil to dry slightly between waterings."}
                  </p>
                  <p>
                    <span className="font-medium">Light:</span>{" "}
                    {product.care?.light || product.inout === "indoor"
                      ? "Place in bright, indirect light."
                      : "Prefers full to partial sun exposure."}
                  </p>
                  <p>
                    <span className="font-medium">Temperature:</span>{" "}
                    {product.care?.temperature ||
                      "Keep at room temperature, away from cold drafts."}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    This {product.type} is perfect for{" "}
                    {product.type === "art"
                      ? "enhancing the beauty of your space"
                      : "helping you maintain your garden with ease"}
                    .
                  </p>
                  {product.material && (
                    <p>
                      <span className="font-medium">Material:</span>{" "}
                      {product.material}
                    </p>
                  )}
                  {product.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span>{" "}
                      {product.dimensions}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
