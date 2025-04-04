import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import {
  seasonalProducts,
  indoorProducts,
  toolsProducts,
  nutritionProducts,
  artProducts,
} from "../constants";

const categoryData = {
  seasonal: seasonalProducts,
  indoor: indoorProducts,
  tools: toolsProducts,
  nutrition: nutritionProducts,
  art: artProducts,
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    let foundProduct = null;
    let related = [];

    // Search through each category for the product
    for (const category in categoryData) {
      foundProduct = categoryData[category].find((p) => p.id.toString() === id);
      if (foundProduct) {
        related = categoryData[category]
          .filter((p) => p.id !== foundProduct.id)
          .slice(0, 8);
        break;
      }
    }

    setProduct(foundProduct);
    setRelatedProducts(related);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  return (
    <section className="pt-[6.5rem]">
      <div className="container mx-auto p-6">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h2>
            <p className="text-lg text-red-400 font-semibold">
              {product.price}
            </p>
            <p className="mt-4 text-gray-600">{product.description}</p>

            <div className="flex items-center space-x-4 mt-6">
              <button
                className="mt-4 text-white border border-red-400 bg-red-400 hover:bg-red-500 px-6 py-2 rounded-lg"
                onClick={handleAddToCart}
              >
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                className="mt-4 text-red-400 border border-red-400 transition-all px-6 py-2 rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleAddToWishlist}
              >
                <div className="flex items-center space-x-2">
                  <p>{addedToWishlist ? "Added to Wishlist" : "Wishlist"}</p>
                  {isHovered ? (
                    <BsHeartFill
                      size={20}
                      className="text-red-400 bg-inherit"
                    />
                  ) : (
                    <BsHeart size={20} className="text-red-400 bg-inherit" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews?.map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className="bg-white rounded-lg shadow-lg border border-gray-300 cursor-pointer group"
                onClick={() => navigate(`/products/${related.id}`)}
              >
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-60 object-cover rounded-t-lg transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative h-24 md:h-28">
                  <h4 className="text-lg font-semibold text-gray-700 flex justify-start">
                    {related.title}
                  </h4>
                  <p className="absolute text-base font-semibold text-red-400 mt-2 group-hover:-translate-y-5 group-hover:opacity-0 transition-all duration-300">
                    {related.price}
                  </p>
                  <div className="absolute flex items-center text-sm text-gray-400 mt-4 w-full opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                    <p className="mr-2 font-semibold">Show Product</p>
                    <hr className="border-[1px] border-gray-400 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
