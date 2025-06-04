import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialCartItems = [
  {
    id: 1,
    name: 'Yummy Multivitamin Gummies',
    quantity: 2,
    price: 14.99,
    image: 'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg',
  },
  {
    id: 2,
    name: 'Omega-3 Brain Boost Gummies',
    quantity: 1,
    price: 16.49,
    image: 'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-lightBg text-darkText text-center px-4">
        <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some yummy gummies to your cart!</p>
      </main>
    );
  }

  return (
    <main className="bg-lightBg min-h-screen px-6 md:px-20 py-12 text-darkText">
      <h1 className="text-3xl font-bold text-primary mb-10">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white shadow rounded-xl p-4 gap-5">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-darkText">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                <div className="flex items-center mt-2 gap-2">
                  <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded" disabled>
                    -
                  </button>
                  <span className="text-md font-medium">{item.quantity}</span>
                  <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded" disabled>
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-accent font-bold text-lg">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-2 font-semibold"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg text-darkText mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
