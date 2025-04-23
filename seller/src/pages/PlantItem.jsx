import { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PlantItem = () => {
  const [images, setImages] = useState(Array(4).fill(false));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [season, setSeason] = useState("spring"); // Updated to lowercase to match backend validation
  const [inout, setInout] = useState("indoor"); // Updated to lowercase to match backend validation
  const [type, setType] = useState("plant"); // Changed default to match backend's expected values
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sellerId, setSellerId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const tokenData = localStorage.getItem("token");

    if (!userData || !tokenData) {
      console.error("User data or token not found in local storage");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setSellerId(parsedUser.sellerId || "");
      setToken(tokenData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();

      formData.append("sellerId", sellerId);
      formData.append("type", type); // Using "plant" or "flower" to match backend expectations
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("season", season.toLowerCase()); // Ensure lowercase to match backend validation
      formData.append("inout", inout.toLowerCase()); // Ensure lowercase to match backend validation
      formData.append("quantity", quantity);

      // Check if at least one image is selected
      let hasImage = false;
      // Append only the images that were selected
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
          hasImage = true;
        }
      });

      if (!hasImage) {
        setMessage({ type: "error", text: "At least one image is required" });
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Use the API_URL variable for the request
      const response = await axios.post(
        `${API_URL}/api/inventory/add`,
        formData,
        config
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "Plant added successfully!" });
        // Reset form
        setImages(Array(4).fill(false));
        setName("");
        setDescription("");
        setPrice("");
        setSeason("spring");
        setInout("indoor");
        setType("plant");
        setQuantity(1);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to add plant",
        });
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error adding plant",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Shared gradient text style
  const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400";

  // Shared input style
  const inputStyle =
    "w-full px-4 py-3 bg-white/70 border border-emerald-900/20 rounded-lg text-gray-800 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300 shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <p className={`text-base font-semibold ${gradientTextStyle} mb-4`}>
          Upload Images
        </p>
        <div className="flex gap-4 flex-wrap">
          {[0, 1, 2, 3].map((index) => (
            <label
              key={index}
              htmlFor={`flowerImage${index}`}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-green-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-emerald-500/30 relative z-10"
                  src={
                    !images[index]
                      ? assets.upload_area
                      : URL.createObjectURL(images[index])
                  }
                  alt="Upload"
                />
              </div>
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`flowerImage${index}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
          Plant Type
        </p>
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className={inputStyle}
        >
          <option value="plant">Plant</option>
          <option value="flower">Flower</option>
        </select>
      </div>

      <div>
        <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
          Plant Name
        </p>
        <input
          className={inputStyle}
          type="text"
          placeholder="Enter Plant Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div>
        <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
          Description
        </p>
        <textarea
          className={inputStyle}
          placeholder="Describe the plant"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
            Season
          </p>
          <select
            onChange={(e) => setSeason(e.target.value)}
            value={season}
            className={inputStyle}
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Fall/Autumn</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div>
          <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
            Indoor/Outdoor
          </p>
          <select
            onChange={(e) => setInout(e.target.value)}
            value={inout}
            className={inputStyle}
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
            Price
          </p>
          <input
            className={inputStyle}
            type="number"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <p className={`text-base font-semibold ${gradientTextStyle} mb-2`}>
          Quantity
        </p>
        <input
          className={inputStyle}
          type="number"
          placeholder="Enter Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          required
          min="1"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isLoading ? "Adding Plant..." : "Add Plant"}
      </button>
    </form>
  );
};

export default PlantItem;