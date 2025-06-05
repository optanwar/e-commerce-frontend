import React, { useState } from 'react';
import { Star } from 'lucide-react';

const SubmitReview = () => {
  const [review, setReview] = useState({
    name: '',
    rating: 0,
    comment: '',
  });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (value) => {
    setReview({ ...review, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send review to backend here
    console.log('Submitted Review:', review);
    alert('Thank you for your review!');
    setReview({ name: '', rating: 0, comment: '' });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* <h2 className="text-3xl font-bold text-center text-primary mb-8">Submit Your Review</h2> */}
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Tell Us What You Think About YummyGummies!</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={review.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Your Email</label>
          <input
            type="text"
            name="email"
            value={review.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Comment</label>
          <textarea
            name="comment"
            rows="4"
            value={review.comment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Write your thoughts..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full font-semibold"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
