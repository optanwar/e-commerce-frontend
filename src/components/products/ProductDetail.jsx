import React from "react";
import { useParams } from "react-router-dom";

// Static product data
const products = [
  {
    id: 1,
    name: "Yummy Multivitamin Gummies",
    description:
      "Packed with essential nutrients like Vitamin A, C, D3, and E, our multivitamin gummies support your child’s growth, immune system, and overall wellness. Naturally flavored with mixed berries, they’re as tasty as they are healthy.",
    price: 14.99,
    image:
      "https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Immune Boost Gummies",
    description:
      "Boost your kid’s immune system with our vitamin C + zinc gummies. Formulated to help fight off colds and keep them healthy year-round. Sweetened naturally and free from artificial dyes.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1611080626919-b83e8eaf1a34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Omega-3 Brain Boost Gummies",
    description:
      "Our Omega-3 DHA gummies help support brain development and cognitive function. Sourced from sustainable fish oils and flavored with orange and lemon for a kid-approved taste.",
    price: 16.49,
    image:
      "https://images.unsplash.com/photo-1581091012184-7e0cdfbb6791?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Probiotic Gummies",
    description:
      "Promote digestive health with our kid-friendly probiotic gummies. Each serving contains 1 billion CFUs and a natural fruit punch flavor. Great for sensitive tummies.",
    price: 13.75,
    image:
      "https://images.unsplash.com/photo-1627556706778-7c3c8c8a142c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-lightBg text-darkText">
        <p className="text-xl font-medium">Product not found</p>
      </main>
    );
  }

  return (
    <main className="bg-lightBg min-h-screen py-12 px-6 md:px-20 text-darkText">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-4 font-heading">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="text-3xl font-bold text-accent mb-8">
            ${product.price.toFixed(2)}
          </div>

          <button
            onClick={() => alert("Cart functionality coming soon!")}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-semibold text-primary mb-6">Other Gummies You May Like</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id.toString() !== id)
            .slice(0, 4)
            .map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-darkText">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</p>
                  <p className="mt-2 text-accent font-bold">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
