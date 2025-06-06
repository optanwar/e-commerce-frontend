import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment } from '../../redux/slices/order/paymentSlice';
import Payment from './Payment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentWrapper() {
  const dispatch = useDispatch();
  const { clientSecret, loading } = useSelector((state) => state.stripe);

  const amount = 9999; // Replace with actual cart total

  useEffect(() => {
    if (!clientSecret) {
      dispatch(processPayment(amount));
    }
  }, [clientSecret, dispatch]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  if (!clientSecret) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Loading payment...</h2>
        <p className="text-sm text-gray-500">Waiting for Stripe client secret</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment />
    </Elements>
  );
}
