import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Success Icon */}
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

      {/* Heading */}
      <h2 className="text-3xl font-bold text-darkText mb-2 text-center">
        Thank You for Your Order!
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 text-center max-w-md">
        Your order has been placed successfully. We’re preparing your yummy gummies and will notify you once they ship!
      </p>

      {/* Order Summary Placeholder */}
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-darkText">Order Summary</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li><span className="font-medium">Order ID:</span> #123456789</li>
          <li><span className="font-medium">Payment:</span> Paid via Stripe</li>
          <li><span className="font-medium">Delivery:</span> Estimated in 3–5 days</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          to='/my-orders'
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm flex items-center gap-2"
        >
          <ShoppingBag size={16} /> View My Orders
        </Link>
        <Link
          to="/products"
          className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
