import React, { useEffect, useState } from 'react';
import { Search, PackageCheck, SquareArrowOutUpRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus, fetchAllOrders } from '../../redux/slices/order/orderAdminSlice';
import {} from '../../redux/slices/order/orderSlice';
import { Link } from 'react-router-dom';

const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

export default function DashboardOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state?.ordersAdmin);

  const [search, setSearch] = useState('');
  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleStatusChange = (id, newStatus) => {
    // Optimistic update for faster UI response
    const updated = localOrders.map((order) =>
      order._id === id ? { ...order, orderStatus: newStatus } : order
    );
    setLocalOrders(updated);

    // API call
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  const filteredOrders = localOrders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary">{order._id}</td>
                  <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{order.user?._id || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold">₹{order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`rounded-lg px-3 py-1 text-sm border focus:outline-none focus:ring-2 focus:ring-primary ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.orderStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.orderStatus === 'Cancelled'
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
                  <td className="p-2 text-darkText hover:text-primary cursor-pointer">
                    <Link to={`/dashboard/order/${order._id}`}>
                      <SquareArrowOutUpRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
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
