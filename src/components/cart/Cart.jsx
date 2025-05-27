import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../../slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  console.log(items, 'items');

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Shopping Cart</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() => dispatch(decreaseQuantity(item._id))}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                –
              </button>

              <span className="px-3 min-w-[24px] text-center">{item.quantity}</span>

              <button
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() =>
                  dispatch(addToCart({ product: item, quantity: 1 }))
                }
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                +
              </button>

              <button
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => dispatch(removeFromCart(item._id))}
                className="ml-6 text-red-600 hover:underline font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4">
        <div className="text-xl font-semibold mb-4 sm:mb-0">
          Total ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''}):{' '}
          <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>

        <div className='flex gap-4'>

        <Link to={"/shipping-details"}
         
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold transition"
        >
          Checkout
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-semibold transition"
        >
          Clear Cart 
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
