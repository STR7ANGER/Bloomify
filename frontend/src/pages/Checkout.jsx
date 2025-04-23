import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStripe } from "react-icons/fa";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (Number(item.price.replace('$', '')) || 0) * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 5; // $10 shipping fee
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <section className="pt-[6rem] min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Delivery Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-400 uppercase text-sm font-semibold mb-2">Your Details</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">DELIVERY INFORMATION</h3>
            <div className="border-t border-gray-300 mb-6"></div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                  required
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300"
                  required
                />
              </div>
            </form>
          </div>

          {/* Right Column - Cart Total */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-400 uppercase text-sm font-semibold mb-2">Your Order</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">CART TOTAL</h3>
            <div className="border-t border-gray-300 mb-6"></div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping Fee:</span>
                <span className="text-gray-800 font-semibold">$5.00</span>
              </div>
              
              <div className="border-t border-gray-300 my-4"></div>
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-red-400 uppercase text-sm font-semibold mb-2">Choose Method</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">PAYMENT METHOD</h3>
              <div className="border-t border-gray-300 mb-6"></div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <label className="flex items-center text-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="mr-3"
                  />
                  <span className="text-[#6772e5]"><FaStripe size={50}/></span>
                </label>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <label className="flex items-center text-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="mr-3"
                  />
                  <span>CASH ON DELIVERY</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-red-400 text-white text-center py-4 rounded-lg font-bold hover:bg-red-500 transition duration-200"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;