import React from 'react';
import { Link } from 'react-router-dom';

const dummyCart = [
  {
    id: 1,
    name: 'Yummy Multivitamin Gummies',
    price: 14.99,
    quantity: 2,
    image:
      'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Immune Boost Gummies',
    price: 12.99,
    quantity: 1,
    image:
      'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function CheckoutPage() {
  const total = dummyCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-lightBg min-h-screen py-10 px-4 md:px-20 text-darkText">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Billing Details */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Billing Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                placeholder="123 Main St"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">ZIP</label>
                <input
                  type="text"
                  placeholder="10001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
          <div className="space-y-4">
            {dummyCart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-accent">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order */}
          <Link
            to={'/confirm-order'}
            className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition"
          >
            Place Order
          </Link>
        </div>
      </div>
    </main>
  );
}
