import React, { useState } from 'react';

// Dummy Orders Data
const dummyOrdersData = [
  {
    id: 'O-001',
    customerName: 'Emily Green',
    date: '2024-03-15',
    status: 'Completed',
    items: [
      { name: 'Monstera Deliciosa', type: 'Plant', quantity: 1, price: 45.99 },
      { name: 'Pruning Shears', type: 'Tools', quantity: 1, price: 24.99 }
    ],
    total: 70.98
  },
  {
    id: 'O-002',
    customerName: 'Michael Woods',
    date: '2024-03-20',
    status: 'Processing',
    items: [
      { name: 'Botanical Watercolor', type: 'Art', quantity: 1, price: 129.99 },
      { name: 'Watering Can', type: 'Tools', quantity: 1, price: 35.00 }
    ],
    total: 164.99
  },
  {
    id: 'O-003',
    customerName: 'Sarah Bloom',
    date: '2024-03-22',
    status: 'Shipped',
    items: [
      { name: 'Lavender', type: 'Plant', quantity: 2, price: 12.50 },
      { name: 'Ceramic Plant Pot', type: 'Art', quantity: 1, price: 65.50 }
    ],
    total: 90.50
  },
  {
    id: 'O-004',
    customerName: 'David Stone',
    date: '2024-03-25',
    status: 'Completed',
    items: [
      { name: 'Pruning Shears', type: 'Tools', quantity: 2, price: 24.99 }
    ],
    total: 49.98
  }
];

const Orders = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on status and search term
  const filteredOrders = dummyOrdersData.filter(order => 
    (activeStatus === "All" || order.status === activeStatus) &&
    (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Status color mapping
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Shipped': 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Order History
            </h2>
          </div>

          {/* Filtering Section */}
          <div className="flex justify-between p-4 bg-gray-50/50">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
              {["All", "Completed", "Processing", "Shipped"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeStatus === status
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Orders Table */}
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-emerald-600 hover:text-emerald-900 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* No Orders Found Message */}
              {filteredOrders.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  No orders found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;