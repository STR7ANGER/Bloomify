import { useWishlist } from "../components/WishlistContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext"; // Import useCart hook
import { useState } from "react"; // Import useState to manage added state


function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart function
  
  const [addedToCart, setAddedToCart] = useState(null); // State to manage the "Added to Cart" message
  
  const [showClearModal, setShowClearModal] = useState(false);
  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    setAddedToCart(product.id); // Set the "Added to Cart" state for the specific product
    setTimeout(() => setAddedToCart(null), 2000); // Reset the "Added to Cart" state after 2 seconds
  };

  const calculateTotal = () => {
    return wishlist.reduce((total, item) => total + (Number(item.price.replace('$', '')) || 0), 0);
  };

  const handleRemove = () => {
    if (itemToRemove) {
      removeFromWishlist(itemToRemove.id);
      setItemToRemove(null);
      setShowRemoveModal(false);
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setShowClearModal(false);
  };

  return (
    <section className="pt-[6.5rem] min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Wishlist</h2>

        {wishlist.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600">Your wishlist is empty.</p>
            <button
              className="mt-4 px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wishlist Items */}
                <div className="md:col-span-2">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col flex-1 px-4">
                        <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                        <p className="text-red-400 font-semibold">${(Number(item.price.replace('$', ''))).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <FaTrashAlt size={18} />
                        </button>
                        <button
                          className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
                          onClick={() => navigate(`/products/${item.id}`)}
                        >
                          View Product
                        </button>
                        {/* Add to Cart Button */}
                        <button
                          className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition duration-200"
                          onClick={() => handleAddToCart(item)}
                        >
                          {addedToCart === item.id ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700">Wishlist Summary</h3>
                  <div className="flex justify-between mt-4">
                    <p className="text-gray-600">Total Value:</p>
                    <p className="text-gray-800 font-semibold">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <button
                    className="mt-4 w-full bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                    onClick={() => navigate("/cart")}
                  >
                    Go to Cart
                  </button>
                  <button
                    className="mt-2 w-full text-gray-600 border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
                    onClick={() => setShowClearModal(true)}
                  >
                    Clear Wishlist
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Clear Whislist Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Clear Whislist
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear your entire wishlist?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500"
                onClick={handleClearWishlist}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Wishlist;
