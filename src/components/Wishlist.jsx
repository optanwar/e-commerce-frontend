import React, { useState } from 'react';
import { HeartOff } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Vitamin C Gummies',
      price: 19.99,
      image:
        'https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Immunity Boost Gummies',
      price: 24.99,
      image:
        'https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: 'Iron + Zinc Gummies',
      price: 22.49,
      image:
        'https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="px-4 md:px-10 py-8 max-w-6xl mx-auto sm:py-20 md:py-32">
      <h2 className="text-2xl font-heading text-primary mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <HeartOff className="mx-auto mb-4 w-10 h-10 text-red-400" />
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border  border-primary border-dotted rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-darkText">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">${item.price.toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-auto bg-primary hover:bg-red-600 text-white px-4 py-2 text-sm rounded transition"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
