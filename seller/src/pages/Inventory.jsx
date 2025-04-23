import  { useState } from 'react';

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
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory Management</h1>
          <p className="text-gray-500">Browse and manage your inventory items</p>
        </div>
        
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto">
            {["Plant", "Tools", "Art"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
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

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
                  {item.subType}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-lg text-emerald-600">${item.price.toFixed(2)}</div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Items Found Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what your looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;