import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  calculateTotals,
  clearCart,
} from '../../redux/slices/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((item) => item._id === id);
    if (!item) return;

    let newQuantity = item.quantity;
    if (type === 'increment') newQuantity++;
    if (type === 'decrement' && newQuantity > 1) newQuantity--;

    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-lightBg text-darkText text-center px-4">
        <h1 className="text-3xl font-bold mb-3 text-primary">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some yummy gummies to your cart!</p>
      </main>
    );
  }

  return (
    <main className="bg-lightBg min-h-screen px-6 md:px-20 py-12 text-darkText">
      <h1 className="text-3xl font-bold text-primary mb-10">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white shadow rounded-xl p-4 gap-5"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, 'decrement')}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-md font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 'increment')}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-accent font-bold text-lg">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-2 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition"
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={handleClearCart}
            className="w-full text-sm text-red-500 mt-4 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
