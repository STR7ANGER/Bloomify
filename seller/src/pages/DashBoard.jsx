import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp 
} from 'lucide-react';

// Dummy Data
const salesData = [
  { month: 'Jan', sales: 4000, orders: 24 },
  { month: 'Feb', sales: 3000, orders: 18 },
  { month: 'Mar', sales: 5000, orders: 32 },
  { month: 'Apr', sales: 4500, orders: 28 },
  { month: 'May', sales: 6000, orders: 40 },
];

const categoryData = [
  { name: 'Plants', value: 40, color: '#10B981' },
  { name: 'Tools', value: 30, color: '#3B82F6' },
  { name: 'Art', value: 30, color: '#8B5CF6' },
];

const DashBoard = () => {
  // Calculate key metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const averageOrderValue = totalRevenue / salesData.reduce((sum, item) => sum + item.orders, 0);
  const latestMonthSales = salesData[salesData.length - 1].sales;
  const salesGrowth = ((salesData[salesData.length - 1].sales - salesData[salesData.length - 2].sales) / salesData[salesData.length - 2].sales * 100).toFixed(2);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Business Dashboard
            </h2>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            {[
              { 
                icon: <DollarSign className="text-emerald-600" />, 
                title: 'Total Revenue', 
                value: `$${totalRevenue.toLocaleString()}`,
                subtext: `+${salesGrowth}% from last month`
              },
              { 
                icon: <ShoppingCart className="text-blue-600" />, 
                title: 'Total Orders', 
                value: salesData.reduce((sum, item) => sum + item.orders, 0),
                subtext: 'This Quarter'
              },
              { 
                icon: <Package className="text-purple-600" />, 
                title: 'Avg. Order Value', 
                value: `$${averageOrderValue.toFixed(2)}`,
                subtext: 'Last 5 Months'
              },
              { 
                icon: <TrendingUp className="text-green-600" />, 
                title: 'Latest Month Sales', 
                value: `$${latestMonthSales.toLocaleString()}`,
                subtext: 'May 2024'
              }
            ].map((metric, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-all"
              >
                <div className="bg-gray-100 rounded-full p-3">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">{metric.title}</p>
                  <h3 className="text-xl font-bold text-emerald-800">{metric.value}</h3>
                  <p className="text-xs text-gray-500">{metric.subtext}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Sales Line Chart */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">
                Monthly Sales Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">
                Sales by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { 
                    title: 'New Order', 
                    description: 'Order #O-234 for Botanical Watercolor',
                    time: '2 mins ago' 
                  },
                  { 
                    title: 'Inventory Update', 
                    description: 'Added 10 new Monstera plants',
                    time: '1 hour ago' 
                  },
                  { 
                    title: 'Sale Completed', 
                    description: 'Shipped order to Emily Green',
                    time: '3 hours ago' 
                  }
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-emerald-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;