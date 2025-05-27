import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


const Feedback = () => {
  return (
    <div className="bg-[#EDF7FF] flex items-center">
     
      <div className="container mx-auto px-6 py-10 md:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image on the left */}
          <div className="w-full md:w-1/2">
            <img
              src="/feedback.jpg" // Ensure image is in the public folder
              alt="Feedback"
              className=" object-cover rounded-2xl"
            />
          </div>

          {/* Text on the right */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 font-roboto">
              We Want to Hear Your Thoughts or Opinion
            </h2>
            <p className="mt-4 text-gray-600 font-roboto">
              Your opinions matter and we'd love to know what you think about our products.
            </p>
            <button className="flex items-center gap-2 font-roboto mt-6 bg-primary  text-white px-6 py-3 rounded shadow transition">
              Click to Review <FaArrowUpRightFromSquare size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
