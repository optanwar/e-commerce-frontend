import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmOrder() {
  // Dummy cart items
  const cartItems = [
    {
      id: 1,
      name: 'Yummy Multivitamin Gummies',
      quantity: 2,
      price: 14.99,
    },
    {
      id: 2,
      name: 'Omega-3 Brain Boost Gummies',
      quantity: 1,
      price: 16.49,
    },
  ];

  // Dummy shipping address
  const shippingAddress = {
    name: 'Jane Doe',
    address: '123 Rainbow Street',
    city: 'Candyland',
    state: 'CA',
    zip: '90210',
  };

  // Calculate total
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-lightBg text-darkText py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Confirm Your Order</h1>

        {/* Shipping Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p>{shippingAddress.name}</p>
          <p>{shippingAddress.address}</p>
          <p>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
          </p>
        </section>

        {/* Cart Items */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b border-gray-200 py-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-accent">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Total */}
        <section className="mb-8 flex justify-between items-center text-2xl font-bold text-primary">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </section>

        {/* Proceed Button */}
        <button
          onClick={() => navigate('/payment')}
          className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition"
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
}
