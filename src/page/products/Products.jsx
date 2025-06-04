import { Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
  const products = [
    {
      id: 1,
      name: 'Berry Blast Gummies',
      price: '$14.99',
      image:
        'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Vitamin C Citrus Bears',
      price: '$12.49',
      image:
        'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Omega-3 Fruity Fish',
      price: '$16.00',
      image:
        'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      name: 'Multi-Vitamin Rainbow Drops',
      price: '$18.75',
      image:
        'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'Iron + B12 Gummies',
      price: '$13.50',
      image:
        'https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <main className="bg-lightBg text-darkText min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4094589/pexels-photo-4094589.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
       <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-accent/80" />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center font-heading">
          Shop <span className="text-accent">Gummies</span>
        </h1>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            // <div
            //   key={product.id}
            //   className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
            // >
            //   <img
            //     src={product.image}
            //     alt={product.name}
            //     className="w-full h-52 object-cover rounded-xl"
            //   />
            //   <div className="mt-4 flex flex-col flex-grow justify-between">
            //     <div>
            //       <h3 className="text-lg font-semibold text-primary">
            //         {product.name}
            //       </h3>
            //       <p className="text-accent text-base font-medium mt-1">
            //         {product.price}
            //       </p>
            //     </div>
            //     <button className="mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition">
            //       Add to Cart
            //     </button>
            //   </div>
            // </div>
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-soft p-4 relative hover:shadow-hoverCard transition border  border-primary border-dotted"
            >
              {/* Favorite Icon */}
              <button className="absolute top-6 right-6 text-gray-400 hover:text-primary transition">
                <Heart className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <img
                src="https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={`Gummy ${product.id}`}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              {/* Product Title */}
              <Link to={`/products/${product.id}`}>
                {' '}
                <h3 className="text-lg font-heading text-accent mb-1">{product.name}</h3>
              </Link>

              {/* Price */}
              <p className="text-md font-semibold text-darkText mb-1"> {product.price}</p>

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
    </main>
  );
}
