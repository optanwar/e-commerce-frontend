import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const CTA = () => {
  const code = 'abc1023';
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      scalar: 0.5,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative bg-accent text-white text-center py-12 px-4">
      <h2 className="text-3xl font-heading mb-4">Get 10% Off Your First Order!</h2>

      <button
        onClick={handleClick}
        className="relative bg-white text-accent font-bold px-6 py-3 rounded-2xl shadow-cta transition duration-300 ease-in-out
                   hover:bg-pink-100 hover:text-primary hover:shadow-promo"
      >
        {/* Actual Text */}
        {copied ? 'Copied Code!' : 'Claim Discount'}

        {/* Invisible placeholder to lock size */}
        <span className="invisible absolute">
          Claim Discount
        </span>
      </button>
    </section>
  );
};

export default CTA;
