import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add real payment processing logic

    alert('Payment Successful! Thank you for your purchase.');
    navigate('/order-success'); // Or wherever you want after payment
  };

  return (
    <main className="min-h-screen bg-lightBg text-darkText py-12 px-6 md:px-20 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-8">Payment Details</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardName" className="block mb-2 font-semibold">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block mb-2 font-semibold">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              maxLength={16}
              pattern="\d{16}"
              title="Enter a valid 16-digit card number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="expiry" className="block mb-2 font-semibold">
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                required
                pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                title="Enter expiry in MM/YY format"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={5}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="cvv" className="block mb-2 font-semibold">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength={3}
                pattern="\d{3}"
                title="Enter 3-digit CVV"
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </main>
  );
}
