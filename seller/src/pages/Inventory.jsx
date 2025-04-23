// InventoryManagement.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  // State management
  const [inventory, setInventory] = useState({
    flower: [],
    plant: [],
    art: [],
    tools: [],
  });
  const [activeTab, setActiveTab] = useState("plant");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for add/edit
  const [showForm, setShowForm] = useState(false);
  const [formAction, setFormAction] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    type: "plant",
    name: "",
    description: "",
    price: "",
    category: "",
    season: "spring",
    inout: "indoor",
    quantity: "",
    images: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    },
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      console.error("User data not found in local storage");
      setError("User authentication error. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      const id = parsedUser.sellerId;

      // Check if id exists and is not empty
      if (!id) {
        console.error("No seller ID found in user data:", parsedUser);
        setError(
          "Seller ID not found. Please make sure you're logged in as a seller."
        );
        setIsLoading(false);
        return;
      }

      setSellerId(id);
      // Now fetch the inventory with a valid ID
      fetchInventory(id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setError("Error processing user data. Please log in again.");
      setIsLoading(false);
    }
  }, []);

  // Get API URL and auth data
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // API request configuration
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchInventory = async (id) => {
    const sellerIdToUse = id || sellerId;

    if (!sellerIdToUse || sellerIdToUse.trim() === "") {
      console.error("Missing or empty seller ID:", sellerIdToUse);
      setError("Seller ID is missing. Please log in again as a seller.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log(
        `Making API request to: ${API_URL}/inventory/all/${sellerIdToUse}`
      );

      const response = await axios.get(
        `${API_URL}/inventory/all/${sellerIdToUse}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        if (response.data.count === 0) {
          console.log("Inventory is empty. Try adding your first item.");
        }
        setInventory(response.data.inventory);
      } else {
        setError(response.data.message || "Failed to fetch inventory");
      }
    } catch (err) {
      console.error("Inventory fetch error:", err);
      setError(
        err.response?.data?.message || err.message || "Error fetching inventory"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        [name]: files[0],
      },
    });
  };

  // Open edit form with selected item data
  const openEditForm = (item) => {
    setFormAction("edit");
    setSelectedItem(item);

    setFormData({
      type: item.type.toLowerCase(),
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category || "",
      season: item.season || "spring",
      inout: item.inout || "indoor",
      quantity: String(item.quantity),
      images: {
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      },
    });

    setShowForm(true);
  };

  // Submit form for add or edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId || !token) {
      setError("Authentication information missing");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("sellerId", sellerId);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);

      // Add type-specific fields
      if (formData.type === "flower" || formData.type === "plant") {
        formDataToSend.append("season", formData.season);
        formDataToSend.append("inout", formData.inout);
      } else {
        formDataToSend.append("category", formData.category);
      }

      // Append images if available
      Object.keys(formData.images).forEach((key) => {
        if (formData.images[key]) {
          formDataToSend.append(key, formData.images[key]);
        }
      });

      let response;

      if (formAction === "add") {
        response = await axios.post(
          `${API_URL}/inventory/add`,
          formDataToSend,
          config
        );
      } else {
        response = await axios.put(
          `${API_URL}/inventory/update/${
            selectedItem._id
          }/${selectedItem.type.toLowerCase()}`,
          formDataToSend,
          config
        );
      }

      if (response.data.success) {
        // Refresh inventory list
        fetchInventory();
        setShowForm(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Delete item
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/inventory/remove/${item._id}/${item.type.toLowerCase()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { sellerId },
        }
      );

      if (response.data.success) {
        // Refresh inventory list
        fetchInventory();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Get filtered items based on active tab and search term
  const filteredItems = inventory[activeTab]
    ? inventory[activeTab].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Inventory Management
            </h1>
            <p className="text-gray-500">
              Browse and manage your inventory items
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex text-red-400 focus:outline-none focus:text-red-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto">
            {["plant", "flower", "art", "tools"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={`Search ${activeTab}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading inventory...</p>
          </div>
        ) : (
          <>
            {/* Inventory Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        item.image && item.image.length > 0
                          ? item.image[0]
                          : "/api/placeholder/200/200"
                      }
                      alt={item.name}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-2">
                      {activeTab === "plant" || activeTab === "flower" ? (
                        <>
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
                            {item.season}
                          </span>
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                            {item.inout}
                          </span>
                        </>
                      ) : (
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      Qty: {item.quantity}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg text-emerald-600">
                        ${parseFloat(item.price).toFixed(2)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Items Found Message */}
            {filteredItems.length === 0 && !isLoading && (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  No items found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or add your first item.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {formAction === "add" ? "Add New Item" : "Edit Item"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="space-y-4">
                {/* Product Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="plant">Plant</option>
                    <option value="flower">Flower</option>
                    <option value="art">Art</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  ></textarea>
                </div>

                {/* Price and Quantity - Side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Plant/Flower specific fields */}
                {(formData.type === "plant" || formData.type === "flower") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Season
                      </label>
                      <select
                        name="season"
                        value={formData.season}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Indoor/Outdoor
                      </label>
                      <select
                        name="inout"
                        value={formData.inout}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Art/Tools specific fields */}
                {(formData.type === "art" || formData.type === "tools") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                )}

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="mb-2">
                        <input
                          type="file"
                          name={`image${num}`}
                          onChange={handleImageChange}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          accept="image/*"
                          required={num === 1 && formAction === "add"}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    First image is required and will be used as the main product
                    image.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
                >
                  {formAction === "add" ? "Add Item" : "Update Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
