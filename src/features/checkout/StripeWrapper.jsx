// src/features/checkout/StripeWrapper.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import { processPayment } from '../../redux/slices/order/paymentSlice';


export default function StripeWrapper() {
    const dispatch = useDispatch();
      const { stripeApiKey } = useSelector((state) => state.stripe);
    const { clientSecret, loading } = useSelector((state) => state.stripe);
    
    const stripePromise = loadStripe(stripeApiKey);
  const { cartItems, totalAmount } = useSelector((state) => state.cart); // If you have real cart state
  const amountInCents = Math.round(totalAmount * 100);

  useEffect(() => {
    if (!clientSecret && amountInCents > 0) {
      dispatch(processPayment(amountInCents));
    }
  }, [clientSecret, amountInCents, dispatch]);

  if (!clientSecret) return <p className="text-center py-10">Loading payment...</p>;

  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment />
    </Elements>
  );
}
