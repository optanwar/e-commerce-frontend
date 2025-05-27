import React from 'react';

const OrderDetails = () => {
  const order = {
    orderId: 'ORD123456789',
    orderDate: 'May 26, 2025',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main Street, City, Country',
    },
    paymentMethod: 'Credit Card',
    items: [
      {
        name: 'Wireless Headphones',
        price: 59.99,
        quantity: 1,
      },
      {
        name: 'Bluetooth Speaker',
        price: 39.99,
        quantity: 2,
      },
    ],
  };

  const itemPrice = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxPrice = +(itemPrice * 0.1).toFixed(2);
  const shippingPrice = itemPrice > 100 ? 0.0 : 10.0;
  const totalPrice = (itemPrice + taxPrice + shippingPrice).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

      <div className="mb-6">
        <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
        <p><span className="font-medium">Order Date:</span> {order.orderDate}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Customer Info</h3>
        <p>{order.customer.name}</p>
        <p>{order.customer.email}</p>
        <p>{order.customer.address}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Items Ordered</h3>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Payment Info</h3>
        <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
      </div>

      <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${itemPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${taxPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shippingPrice.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
