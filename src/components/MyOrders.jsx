import React from 'react';
import { PackageCheck, Truck } from 'lucide-react';

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <PackageCheck className="text-green-600" size={20} />;
      case 'Shipped':
        return <Truck className="text-blue-500" size={20} />;
      default:
        return <Truck className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="px-4 md:px-10 py-8 max-w-4xl mx-auto sm:py-20 md:py-32">
      <h2 className="text-2xl font-heading text-primary mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 py-10">You haven’t placed any orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-darkText font-semibold text-sm">
                    Order <span className="text-primary">#{order.id}</span>
                  </p>
                  <p className="text-xs text-gray-500">Placed on {order.date}</p>
                </div>

                <div className="text-sm space-y-1 text-gray-700">
                  <p>
                    Items: <span className="font-medium">{order.items}</span>
                  </p>
                  <p>
                    Total: <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium">
                  {getStatusIcon(order.status)}
                  <span
                    className={`${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Shipped'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
