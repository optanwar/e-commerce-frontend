import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, resetStripe } from '../../redux/slices/order/paymentSlice';
import Payment from './Payment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentWrapper() {
  const dispatch = useDispatch();
  const { clientSecret, error } = useSelector((state) => state.stripe);
  const { totalPrice } = useSelector((state) => state.cart);

  const amount = Math.round(Number(totalPrice || 0) * 100); // cents

  useEffect(() => {
    // Reset payment state before trying new paymentIntent
    dispatch(resetStripe());
    if (amount >= 50) {
      dispatch(processPayment(amount));
    }
  }, [amount, dispatch]);

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h2 className="text-xl font-bold">Payment Error</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Loading payment...</h2>
        <p className="text-sm text-gray-500">Waiting for Stripe client secret...</p>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment />
    </Elements>
  );
}
