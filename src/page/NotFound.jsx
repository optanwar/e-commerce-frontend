import React from 'react';
import { SmilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF7F0] text-center px-4 sm:px-6 md:px-8">
      <SmilePlus size={56} className="text-primary mb-6" />

      <h1 className="text-5xl sm:text-6xl font-bold text-primary">404</h1>

      <p className="text-lg sm:text-xl mt-4 text-gray-700 font-roboto max-w-xl">
        Oops! The page you're looking for doesn't exist.
      </p>

      <p className="text-sm sm:text-md mt-2 text-gray-500 font-roboto max-w-md">
        Maybe you took a wrong turn while snacking on gummies? Let's get you back on track.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-primary text-white px-5 py-3 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
