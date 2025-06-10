import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  // Calculate total amount safely
  const totalAmount =
    typeof cartTotalAmount === 'number'
      ? cartTotalAmount
      : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '', 
    zip: '',
    country: '',
    phone: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic form validation function (you can expand it)
  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.address.trim() &&
      formData.city.trim() &&
      formData.zip.trim() &&
      formData.country.trim() &&
      formData.phone.trim() &&
      cartItems.length > 0
    );
  };

  // Handle place order: navigate passing state
  const handlePlaceOrder = () => {
    if (!isFormValid()) {
      alert('Please fill in all fields and make sure your cart is not empty.');
      return;
    }
    navigate('/confirm-order', {
      state: {
        cartItems,
        formData,
      },
    });
  };

  return (
    <main className="bg-lightBg min-h-screen py-10 px-4 md:px-20 text-darkText">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Billing Details */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Billing Details</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block mb-1 font-medium" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 555 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="zip">
                  ZIP
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  placeholder="10001"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
                required
              />
            </div>

           <div className="grid grid-cols-3 gap-4">
  <div>
    <label className="block mb-1 font-medium" htmlFor="city">
      City
    </label>
    <input
      id="city"
      name="city"
      type="text"
      placeholder="New York"
      value={formData.city}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
      required
    />
  </div>

  <div>
    <label className="block mb-1 font-medium" htmlFor="state">
      State
    </label>
    <input
      id="state"
      name="state"
      type="text"
      placeholder="NY"
      value={formData.state}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
      required
    />
  </div>

  <div>
    <label className="block mb-1 font-medium" htmlFor="country">
      Country
    </label>
    <input
      id="country"
      name="country"
      type="text"
      placeholder="USA"
      value={formData.country}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
      required
    />
  </div>
</div>

          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id || item._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={'https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
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
              ))
            )}
          </div>

          {/* Total */}
          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!isFormValid()}
            className={`block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
