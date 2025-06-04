import React from 'react';
import { Heart } from 'lucide-react';

const Projects = () => {
  return (
    <>
      <section className="py-10 sm:py-12 sm:px-6 md:px-8 md:py-16 lg:py-20 xl:py-24 2xl:py-28 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-center text-secondary mb-10">Best Sellers</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-soft p-4 relative hover:shadow-hoverCard transition border  border-primary border-dotted"
            >
              {/* Favorite Icon */}
              <button className="absolute top-6 right-6 text-gray-400 hover:text-primary transition">
                <Heart className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <img
                src="https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={`Gummy ${i}`}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              {/* Product Title */}
              <h3 className="text-lg font-heading text-accent mb-1">Strawberry Gummies</h3>

              {/* Price */}
              <p className="text-md font-semibold text-darkText mb-1">$12.99</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.13 3.455a1 1 0 00.95.69h3.633c.969 0 1.371 1.24.588 1.81l-2.94 2.137a1 1 0 00-.364 1.118l1.13 3.455c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.94 2.137c-.784.57-1.838-.197-1.54-1.118l1.13-3.455a1 1 0 00-.364-1.118L3.346 8.882c-.783-.57-.38-1.81.588-1.81h3.633a1 1 0 00.95-.69l1.13-3.455z" />
                  </svg>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-darkText">Delicious, fruity, and full of vitamins.</p>

              {/* Add to Cart Button */}
              <button className="mt-4 bg-primary text-white w-full py-2 rounded-lg font-bold hover:bg-[#e25555] transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
