import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../slices/orderSlice';
import { Link } from 'react-router-dom';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, myOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch, token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">My Orders</h1>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading your orders...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : myOrders?.orders?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">You haven not placed any orders yet.</div>
      ) : (
        <div className="space-y-8">
          {myOrders?.orders?.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg shadow hover:shadow-md transition bg-white"
            >
              <div className="p-6 flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Left: Products */}
                <div className="flex-1 space-y-4">
                  {order?.orderItems?.map((item) => (
                    <div key={item.product} className="flex items-center gap-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAhotm6qZzexJdG8qyL77o45u6VdTeLwNnG29mZxDF_aG_A4e-FiFckeY5xFxYeOV1TM&usqp=CAU"
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Order Info */}
                <div className="w-full lg:w-64 flex flex-col gap-3 text-sm text-gray-700">
                  <div>
                    <span className="text-gray-500">Order ID:</span>
                    <p className="break-all font-medium">{order._id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Placed on:</span>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Amount:</span>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(order.totalPrice).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`ml-1 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 text-right">
                <Link
                  to={`/order/${order._id}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Order Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
