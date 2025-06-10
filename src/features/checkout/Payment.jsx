import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { createOrder } from '../../redux/slices/order/createOrderSlice';
import { clearCart } from '../../redux/slices/cart/cartSlice'; // ✅ Import clearCart
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { loading: orderLoading, error: orderError } = useSelector((state) => state.order);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const { shippingAddress } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) return;
    setIsProcessing(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-success',
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      alert(`Payment failed: ${stripeError.message}`);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      const orderData = {
        shippingInfo: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: shippingAddress.country,
          pinCode: shippingAddress.zip,
          phoneNo: shippingAddress.phone,
        },
        orderItems: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          // image: item.image || '', // fallback if missing
          image: 'https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          product: item._id,
        })),
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
        totalPrice,
      };

      const res = await dispatch(createOrder(orderData));
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(clearCart()); // ✅ Clear cart on success
        navigate('/order-success');
      } else {
        alert('Order creation failed. Try again!');
      }
    } else {
      alert('Unexpected payment state. Please refresh and try again.');
    }

    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen bg-lightBg text-darkText py-12 px-6 md:px-20 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-8">Payment Details</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="__PrivateStripeElement">
            <PaymentElement />
          </div>

          <button
            type="submit"
            disabled={!stripe || !elements || isProcessing || orderLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
          >
            {isProcessing || orderLoading ? 'Processing...' : 'Pay Now'}
          </button>

          {orderError && (
            <p className="text-red-500 text-sm mt-2">
              {orderError}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
