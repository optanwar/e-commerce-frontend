// src/features/checkout/Payment.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { createOrder } from '../../redux/slices/order/createOrderSlice';

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { loading: orderLoading, error: orderError } = useSelector((state) => state.order);
  const { cartItems, shippingInfo, totalAmount } = useSelector((state) => state.cart); // Use real cart state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-success',
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      alert(`Payment failed: ${stripeError.message}`);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
        totalPrice: totalAmount,
      };

      const res = await dispatch(createOrder(orderData));
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/order-success');
      } else {
        alert('Order creation failed. Try again!');
      }
    }
  };

  return (
    <main className="min-h-screen bg-lightBg text-darkText py-12 px-6 md:px-20 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-8">Payment Details</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />

          <button
            type="submit"
            disabled={!stripe || !elements || orderLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
          >
            {orderLoading ? 'Processing...' : 'Pay Now'}
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
