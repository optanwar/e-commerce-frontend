import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-[#C7E8FF]  flex items-center">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 md:py-24">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl  font-roboto font-bold text-gray-800">
            Your Journey Starts Here
          </h1>
          <p className=" font-roboto mt-4 text-base md:text-lg lg:text-xl text-gray-600 ">
            Discover the best products and services tailored just for you.
          </p>
          <button className=" font-roboto mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded shadow">
          Buy Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/giftset-newlook.webp"
            alt="Hero"
            className="w-full max-w-md md:max-w-full mx-auto"
          />
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;
