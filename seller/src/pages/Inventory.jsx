import React, { useState } from 'react';

// Dummy data for inventory
const dummyInventoryData = [
  // Plants
  {
    id: 'p1', 
    name: 'Monstera Deliciosa', 
    description: 'Iconic tropical plant with large split leaves', 
    type: 'Plant', 
    subType: 'Indoor', 
    price: 45.99, 
    image: '/api/placeholder/200/200'
  },
  {
    id: 'p2', 
    name: 'Lavender', 
    description: 'Fragrant purple flowering plant', 
    type: 'Plant', 
    subType: 'Herb', 
    price: 12.50, 
    image: '/api/placeholder/200/200'
  },
  // Tools
  {
    id: 't1', 
    name: 'Pruning Shears', 
    description: 'Stainless steel garden cutting tool', 
    type: 'Tools', 
    subType: 'Gardening', 
    price: 24.99, 
    image: '/api/placeholder/200/200'
  },
  {
    id: 't2', 
    name: 'Watering Can', 
    description: 'Vintage copper watering can', 
    type: 'Tools', 
    subType: 'Gardening', 
    price: 35.00, 
    image: '/api/placeholder/200/200'
  },
  // Art
  {
    id: 'a1', 
    name: 'Botanical Watercolor', 
    description: 'Delicate watercolor of exotic plants', 
    type: 'Art', 
    subType: 'Painting', 
    price: 129.99, 
    image: '/api/placeholder/200/200'
  },
  {
    id: 'a2', 
    name: 'Ceramic Plant Pot', 
    description: 'Handcrafted ceramic pot with nature-inspired glaze', 
    type: 'Art', 
    subType: 'Pottery', 
    price: 65.50, 
    image: '/api/placeholder/200/200'
  }
];

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("Plant");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on active tab and search term
  const filteredItems = dummyInventoryData.filter(item => 
    item.type === activeTab && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Inventory
            </h2>
          </div>

          {/* Filtering Section */}
          <div className="flex justify-between p-4 bg-gray-50/50">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
              {["Plant", "Tools", "Art"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <input 
              type="text" 
              placeholder={`Search ${activeTab}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Inventory Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-emerald-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500">Type: {item.subType}</span>
                      <div className="font-semibold text-emerald-600">${item.price.toFixed(2)}</div>
                    </div>
                    <button className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm hover:bg-emerald-600 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Items Found Message */}
          {filteredItems.length === 0 && (
            <div className="text-center p-8 text-gray-500">
              No items found in {activeTab} category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;