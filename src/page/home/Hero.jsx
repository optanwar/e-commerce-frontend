import React from 'react';

const Hero = () => {
  return (
    <>
      <section className="bg-trust text-center py-24 px-4 sm:py-28 sm:px-6 md:px-8 md:py-32 lg:py-36 xl:py-44 2xl:py-48">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading text-accent mb-4 leading-tight">
          Gummies Kids Love 😋
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Healthy, tasty, and fun gummies made just for kids. Backed by parents across the USA.
        </p>
        <button className="bg-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#e25555] transition">
          Shop Now
        </button>
      </section>
    </>
  );
};

export default Hero;
