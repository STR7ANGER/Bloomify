import { useState } from 'react';

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
  const statusStyles = {
    'Completed': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      dot: 'bg-green-500'
    },
    'Processing': {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
    },
    'Shipped': {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>
        
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto overflow-x-auto">
            {["All", "Completed", "Processing", "Shipped"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeStatus === status
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search orders or customers..."
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

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-800">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.customerName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-emerald-600">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status].bg} ${statusStyles[order.status].text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[order.status].dot} mr-1.5`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="inline-flex items-center justify-center px-3 py-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Orders Found Message */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;