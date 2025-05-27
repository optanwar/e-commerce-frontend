import React from 'react';
import { useSelector } from 'react-redux';

const ConfirmOrder = ({ formData }) => {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-4">Confirm Your Details</h2>
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>Postal Code:</strong> {formData.postalCode}</p>
        </div>

        <div className="ml-10">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <p><strong>Total Items:</strong> {totalQuantity}</p>
          <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Your Cart Items</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow-sm flex justify-between">
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfirmOrder;
