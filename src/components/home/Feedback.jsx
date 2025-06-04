import React from 'react';
import { ExternalLink } from 'lucide-react';

const Feedback = () => {
  return (
    <div className="bg-lightBg py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.pexels.com/photos/18958642/pexels-photo-18958642/free-photo-of-close-up-of-colorful-candy.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Customer Feedback"
            className="rounded-2xl shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-roboto">
            Loved Our Gummies? Tell Us What You Think!
          </h2>
          <p className="text-gray-600 text-lg font-roboto">
            We’d love to hear about your experience. Share your thoughts, suggestions, or even fun stories!
          </p>

          <a
            href="/submit-review"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition font-semibold"
          >
            Leave a Review <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
