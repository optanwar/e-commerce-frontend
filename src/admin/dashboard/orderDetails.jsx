import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../redux/slices/order/orderSlice';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orderDetails) return <p>No order data available.</p>;

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Order #{orderDetails._id}</h2>
          <p className="text-sm text-gray-600">
            Placed on {new Date(orderDetails.createdAt).toLocaleString()}
          </p>
          <p className="mt-1 text-sm">
            Status:{' '}
            <span className={`capitalize font-semibold ${orderDetails.orderStatus === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
              {orderDetails.orderStatus}
            </span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-700">
            Total: <span className="text-primary text-lg font-bold">${orderDetails.totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-semibold text-primary mb-4">Shipping Information</h3>
        <p><span className="font-semibold">Name:</span> {orderDetails.shippingInfo.name}</p>
        <p><span className="font-semibold">Address:</span> {`${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.country} - ${orderDetails.shippingInfo.pinCode}`}</p>
        <p><span className="font-semibold">Phone:</span> {orderDetails.shippingInfo.phoneNo}</p>
      </div>

      {/* Payment Info */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-semibold text-primary mb-4">Payment</h3>
        <p><span className="font-semibold">Method:</span> {orderDetails.paymentInfo.method || 'Online'}</p>
        <p>
          <span className="font-semibold">Status:</span>{' '}
          <span className={`font-semibold ${orderDetails.paymentInfo.status === 'succeeded' ? 'text-green-600' : 'text-red-500'}`}>
            {orderDetails.paymentInfo.status === 'succeeded' ? 'Paid' : 'Unpaid'}
          </span>
        </p>
        {orderDetails.paidAt && (
          <p><span className="font-semibold">Paid At:</span> {new Date(orderDetails.paidAt).toLocaleString()}</p>
        )}
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-semibold text-primary mb-4">Order Items</h3>
        <div className="space-y-4">
          {orderDetails.orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border p-4 rounded-md">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right font-medium text-darkText">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
