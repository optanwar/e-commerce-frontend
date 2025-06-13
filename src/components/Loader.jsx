import React from 'react';

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-pink-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-primary font-bold animate-pulse text-sm">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
