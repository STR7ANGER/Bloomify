import { useState } from "react";
import { FaTag } from "react-icons/fa";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <section className="pt-[6.5rem] bg-gray-200">
      <div className="max-w-5xl mx-auto p-6 bg-gray-50">
        {/* Address Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="font-semibold">
            Deliver to: <span className="font-bold">Arkadip Das, 201310</span>
          </p>
          <p className="text-sm text-gray-600">
            Bennett University, Plot No. 8-11, TechZone 2, Dadri, Greater Noida
          </p>
          <button className="mt-2 px-4 py-2 text-sm text-pink-600 border border-pink-600 rounded hover:bg-pink-100">
            CHANGE ADDRESS
          </button>
        </div>

        

        {/* Cart Item */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold flex items-center">
            <input type="checkbox" checked className="mr-2" />
            1/1 ITEMS SELECTED
          </h3>

          <div className="flex items-center mt-3 border p-3 rounded-lg">
            <img
              src="https://via.placeholder.com/80"
              alt="Lavender Set"
              className="w-20 h-20 rounded"
            />
            <div className="ml-4 flex-1">
              <h4 className="font-bold">Lavender</h4>
              <p className="text-sm text-gray-600">
                Bloomify House Pot
              </p>
              <div className="flex items-center text-sm mt-2">
                <label className="mr-2">Qty:</label>
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border px-2 py-1 rounded"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span className="ml-2 text-red-600">7 left</span>
              </div>
              <p className="mt-2 font-bold text-lg text-pink-600">
                ₹699 <span className="text-gray-400 line-through">₹2,799</span>{" "}
                <span className="text-green-600">75% OFF</span>
              </p>
            </div>
          </div>
        </div>

        

        {/* Price Details */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">PRICE DETAILS (1 Item)</h3>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <p className="flex justify-between">
              <span>Total MRP</span> <span>₹2,799</span>
            </p>
            <p className="flex justify-between text-green-600">
              <span>Discount on MRP</span> <span>-₹2,100</span>
            </p>
            <p className="flex justify-between">
              <span>Platform Fee</span> <span>₹20</span>
            </p>
            <p className="flex justify-between text-green-600">
              <span>Shipping Fee</span> <span>FREE</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total Amount</span> <span>₹719</span>
            </p>
          </div>
        </div>

        {/* Place Order Button */}
        <button className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
          PLACE ORDER
        </button>
      </div>
    </section>
  );
};

export default Cart;
