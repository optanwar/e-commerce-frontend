// components/MyOrders.jsx
import React from 'react';

const MyOrders = () => {
  const orders = [
    {
      id: 'ORD123456',
      date: '2025-06-01',
      total: 39.98,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD123457',
      date: '2025-05-20',
      total: 19.99,
      status: 'Shipped',
      items: 1,
    },
  ];

  return (
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-2xl font-heading text-primary mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-darkText font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <div className="text-sm text-right md:text-left mt-2 md:mt-0">
                <p className="text-gray-600">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                <p className="text-sm text-green-600 font-medium">{order.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;