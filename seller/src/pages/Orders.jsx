import { useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Get user data from local storage
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      // Check if userData exists before parsing
      if (!userData) {
        console.error("No user data found in local storage");
        setError("User data not found. Please log in again.");
        setLoading(false);
        return;
      }
      
      // Parse user data
      const parsedUser = JSON.parse(userData);
      const sellerId = parsedUser.sellerId;
      
      // Check if sellerId exists and is not empty
      if (!sellerId) {
        console.error("No seller ID found in user data:", parsedUser);
        setError("Seller ID not found. Please make sure you're logged in as a seller.");
        setLoading(false);
        return;
      }
      
      if (!token) {
        throw new Error('Missing authentication token. Please log in again.');
      }
      
      // Determine API URL based on your router configuration
      let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/order/all`;
      
      // Add status filter if needed
      if (activeStatus !== "All") {
        apiUrl += `?status=${activeStatus}`;
      }
      
      console.log(`Fetching orders from: ${apiUrl}`);
      
      const response = await axios({
        method: 'post',
        url: apiUrl,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { sellerId }
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        // Transform order data to match our component's expected format
        const formattedOrders = response.data.orders.map(order => ({
          id: order._id,
          customerName: order.userDetails?.name || 'Unknown Customer',
          date: new Date(order.date).toISOString().split('T')[0], // Format date
          status: order.status,
          items: order.items.map(item => ({
            name: item.name || item.productName,
            type: item.category || 'Product',
            quantity: item.quantity,
            price: item.price
          })),
          total: order.amount
        }));
        
        setOrders(formattedOrders);
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };
  
  fetchOrders(); // Re-fetch when activeStatus changes

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    (searchTerm === "" || 
     order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Status color mapping
  const statusStyles = {
    'Order Placed': {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
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
    },
    'Delivered': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      dot: 'bg-green-500'
    },
    'Cancelled': {
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500'
    }
  };

  // Get status style or fallback to default
  const getStatusStyle = (status) => {
    return statusStyles[status] || {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      dot: 'bg-gray-500'
    };
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
            {["All", "Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center mb-4">
              <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Loading orders...</h3>
            <p className="text-gray-500">Please wait while we fetch your order data.</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Error fetching orders</h3>
            <p className="text-gray-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders Table */}
        {!loading && !error && (
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
                        <span className="text-sm font-medium text-gray-800">{order.id.substring(0, 8)}...</span>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status).bg} ${getStatusStyle(order.status).text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${getStatusStyle(order.status).dot} mr-1.5`}></span>
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
            {filteredOrders.length === 0 && !loading && (
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
        )}
      </div>
    </div>
  );
};

export default Orders;