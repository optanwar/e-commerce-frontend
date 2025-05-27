import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { processPayment, resetPaymentState } from '../../slices/paymentSlice';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const Payment = ({ onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { totalAmount } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const { loading, error, success } = useSelector((state) => state.payment);

  // Local states for confirmation step
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  useEffect(() => {
    if (success) {
      onComplete();
      dispatch(resetPaymentState());
    }
  }, [success, onComplete, dispatch]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setConfirmError(null);

    if (!stripe || !elements) {
      return setConfirmError('Stripe has not loaded yet.');
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return setConfirmError('Card Element not found');

    try {
      // First, get client_secret from backend via thunk
      const data = await dispatch(processPayment({ amount: totalAmount, token })).unwrap();

      const clientSecret = data.client_secret;
      if (!clientSecret) throw new Error('No client secret received from backend');

      // Now confirm card payment with Stripe
      setConfirming(true);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      setConfirming(false);

      if (result.error) {
        setConfirmError(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Payment successful - success state in redux already set by thunk
        // onComplete() will be triggered by useEffect
      } else {
        setConfirmError('Payment failed for unknown reasons.');
      }
    } catch (err) {
      setConfirming(false);
      setConfirmError(err.message || 'Payment processing error.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">💳 Secure Payment</h2>

      <form onSubmit={handlePayment}>
        <div className="mb-4 border p-2 rounded">
          <CardElement options={CARD_OPTIONS} />
        </div>

        {/* Show error from backend or from Stripe confirmation */}
        {(error || confirmError) && (
          <p className="text-red-500 mb-2">{error || confirmError}</p>
        )}

        <button
          type="submit"
          disabled={!stripe || loading || confirming}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {(loading || confirming) ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
