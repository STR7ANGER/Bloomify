import { useState } from "react";
import axios from "axios";
import { assets } from "./../assets/assets";

const ToolItem = ({ sid }) => {
  const [images, setImages] = useState(Array(4).fill(false));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Hand Tools");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("sid", sid);
      formData.append("type", "tools"); // default type as per schema
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      // Append only the images that were selected
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      // Replace with your API endpoint
      const response = await axios.post("/api/items/tool/add", formData);

      if (response.data.success) {
        console.success("Tool added successfully!");
        // Reset form
        setImages(Array(4).fill(false));
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Hand Tools");
      } else {
        console.error(response.data.message || "Failed to add tool");
      }
    } catch (error) {
      console.error("Error adding tool:", error);
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 mb-4">
          Upload Images
        </p>
        <div className="flex gap-4 flex-wrap">
          {[0, 1, 2].map((index) => (
            <label
              key={index}
              htmlFor={`toolImage${index}`}
              className="hover:opacity-75 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-green-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-emerald-500/30 relative z-10"
                  src={
                    !images[index]
                      ? assets.upload_area
                      : URL.createObjectURL(images[index])
                  }
                  alt=""
                />
              </div>
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`toolImage${index}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 mb-2">
          Tool Name
        </p>
        <input
          className="w-full px-4 py-3 bg-gray-800/50 border border-emerald-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
          type="text"
          placeholder="Tool Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 mb-2">
          Description
        </p>
        <textarea
          className="w-full px-4 py-3 bg-gray-800/50 border border-emerald-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
          placeholder="Type Here"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 mb-2">
            Category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-3 bg-gray-800/50 border border-emerald-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
          >
            <option value="Hand Tools">Hand Tools</option>
            <option value="Power Tools">Nutrition</option>
          </select>
        </div>
        

        <div>
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 mb-2">
            Price
          </p>
          <input
            className="w-full px-4 py-3 bg-gray-800/50 border border-emerald-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
            type="number"
            placeholder="$xxxx"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-emerald-800 via-teal-800 to-green-800 text-white rounded-lg font-medium tracking-wide shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-1"
      >
        ADD TOOL
      </button>
    </form>
  );
};

export default ToolItem;
