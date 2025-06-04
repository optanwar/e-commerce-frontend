import React, { useState } from 'react';
import { Search, PackageCheck } from 'lucide-react';

const ordersData = [
  {
    id: 'ORD001',
    customer: 'Alice Smith',
    customerId: '12',
    date: '2025-06-01',
    total: 49.99,
    status: 'Pending',
  },
  {
    id: 'ORD002',
    customer: 'Bob Johnson',
    customerId: '12',
    date: '2025-06-02',
    total: 89.99,
    status: 'Shipped',
  },
  {
    id: 'ORD003',
    customer: 'Carla Brown',
    customerId: '12',
    date: '2025-06-03',
    total: 24.99,
    status: 'Delivered',
  },
  {
    id: 'ORD004',
    customer: 'David Wilson',
    customerId: '12',
    date: '2025-06-04',
    total: 39.99,
    status: 'Cancelled',
  },
];

const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

export default function DashboardOrders() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => setSearch(e.target.value);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <PackageCheck size={24} className="text-primary" /> Orders Management
      </h1>

      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by Order ID"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Customer Id</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.customerId}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`rounded-lg px-3 py-1 text-sm border focus:outline-none focus:ring-2 focus:ring-primary ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Cancelled'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
