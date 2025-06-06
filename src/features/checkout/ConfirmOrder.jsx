import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract state passed from previous page (Checkout)
  const { cartItems, formData: shippingAddress } = location.state || {};

  // Redirect if no cart or shipping info (user shouldn't land here directly)
  useEffect(() => {
    if (!cartItems || !shippingAddress) {
      navigate('/checkout', { replace: true });
    }
  }, [cartItems, shippingAddress, navigate]);

  if (!cartItems || !shippingAddress) {
    // Optional: Show loading or message briefly before redirect
    return (
      <main className="min-h-screen flex items-center justify-center bg-lightBg text-darkText">
        <p className="text-lg">Redirecting to checkout...</p>
      </main>
    );
  }

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handler for proceeding to payment
  const handleProceed = () => {
    navigate('/payment', {
      state: {
        cartItems,
        shippingAddress,
        totalPrice,
      },
    });
  };

  return (
    <main className="min-h-screen bg-lightBg text-darkText py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Confirm Your Order</h1>

        {/* Shipping Info */}
        <section
          aria-labelledby="shipping-info-heading"
          className="mb-8"
        >
          <h2
            id="shipping-info-heading"
            className="text-xl font-semibold mb-4 text-accent"
          >
            Shipping Address
          </h2>
          <address className="not-italic space-y-1">
            <p>{shippingAddress.fullName || shippingAddress.name}</p>
            {shippingAddress.phone && <p>Phone: {shippingAddress.phone}</p>}
            {shippingAddress.email && <p>Email: {shippingAddress.email}</p>}
            {shippingAddress.address && <p>Address: {shippingAddress.address}</p>}
            <p>
              {shippingAddress.city}, {shippingAddress.state || shippingAddress.country}{' '}
              {shippingAddress.zip}
            </p>
           
          </address>
        </section>

        {/* Order Summary */}
        <section
          aria-labelledby="order-summary-heading"
          className="mb-8"
        >
          <h2
            id="order-summary-heading"
            className="text-xl font-semibold mb-4 text-accent"
          >
            Order Summary
          </h2>
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
        </section>

        {/* Total */}
        <section
          className="mb-8 flex justify-between items-center text-2xl font-bold text-primary"
          aria-live="polite"
        >
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </section>

        {/* Proceed Button */}
        <button
          type="button"
          onClick={handleProceed}
          className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-center transition focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
}
