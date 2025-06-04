import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, Users, ShoppingCart, DollarSign, AlertCircle, MessageCircle
} from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 2400 },
  { name: 'Feb', sales: 3200 },
  { name: 'Mar', sales: 2800 },
  { name: 'Apr', sales: 3500 },
  { name: 'May', sales: 4000 },
  { name: 'Jun', sales: 4700 },
];

const topProducts = [
  { name: 'Strawberry Gummies', units: 1200 },
  { name: 'Vitamin C Bears', units: 950 },
  { name: 'Omega-3 Fishies', units: 860 },
  { name: 'Sleepy Melatonin', units: 720 },
];

const orderSources = [
  { name: 'Website', value: 70 },
  { name: 'Mobile App', value: 30 },
];

const COLORS = ['#6366F1', '#34D399'];

const recentOrders = [
  { id: 1, customer: 'Alice', total: '$34.99', status: 'Delivered', date: 'Jun 1' },
  { id: 2, customer: 'Bob', total: '$59.99', status: 'Pending', date: 'Jun 3' },
  { id: 3, customer: 'Charlie', total: '$24.00', status: 'Cancelled', date: 'Jun 4' },
];

const lowStock = [
  { name: 'Vitamin D Gummies', stock: 4 },
  { name: 'Iron Boost Kids', stock: 7 },
];

const activityFeed = [
  { id: 1, message: 'New user JohnDoe signed up', time: '5 mins ago' },
  { id: 2, message: 'Order #1234 has been shipped', time: '10 mins ago' },
  { id: 3, message: 'Product "Melatonin Kids" updated', time: '30 mins ago' },
];

const stats = [
  { label: 'Revenue', value: '$48,120', icon: <DollarSign className="text-green-500" /> },
  { label: 'Total Orders', value: '2,341', icon: <ShoppingCart className="text-blue-500" /> },
  { label: 'Customers', value: '1,098', icon: <Users className="text-purple-500" /> },
  { label: 'Growth', value: '+12.5%', icon: <TrendingUp className="text-indigo-500" /> },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin 👋</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-xl font-bold text-primary">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Top Selling Gummies</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="units" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Extra Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Order Source</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {orderSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-500" /> Low Stock Alerts
          </h2>
          <ul className="space-y-2">
            {lowStock.map((item) => (
              <li key={item.name} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-red-600 font-medium">{item.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-500" /> Activity Feed
          </h2>
          <ul className="space-y-3 text-sm">
            {activityFeed.map((event) => (
              <li key={event.id} className="flex justify-between text-gray-700">
                <span>{event.message}</span>
                <span className="text-xs text-gray-400">{event.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
