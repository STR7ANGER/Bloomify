import { useCart } from "../components/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (Number(item.price.replace('$', '')) || 0) * item.quantity, 0);
  };
  

  return (
    <section className="pt-[6.5rem] min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <button
              className="mt-4 px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="md:col-span-2">
                  {cart.map((item) => (
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
                        <p className="text-red-400 font-semibold">${(Number(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700">Order Summary</h3>
                  <div className="flex justify-between mt-4">
                    <p className="text-gray-600">Subtotal:</p>
                    <p className="text-gray-800 font-semibold">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-600">Shipping:</p>
                    <p className="text-gray-800 font-semibold">$5.00</p>
                  </div>
                  <div className="border-t border-gray-300 my-4"></div>
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total:</p>
                    <p>${(calculateTotal() + 5).toFixed(2)}</p>
                  </div>
                  <button
                    className="mt-4 w-full bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
                    onClick={() => alert("Proceeding to Checkout!")}
                  >
                    Checkout
                  </button>
                  <button
                    className="mt-2 w-full text-gray-600 border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-200"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
