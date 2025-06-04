import { Minus, Plus } from "lucide-react";
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
      "https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Omega-3 Brain Boost Gummies",
    description:
      "Our Omega-3 DHA gummies help support brain development and cognitive function. Sourced from sustainable fish oils and flavored with orange and lemon for a kid-approved taste.",
    price: 16.49,
    image:
      "https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Probiotic Gummies",
    description:
      "Promote digestive health with our kid-friendly probiotic gummies. Each serving contains 1 billion CFUs and a natural fruit punch flavor. Great for sensitive tummies.",
    price: 13.75,
    image:
      "https://images.pexels.com/photos/14433531/pexels-photo-14433531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function ProductDetail() {
  const [qty, setQty] = React.useState(1);

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
    <main className="bg-lightBg min-h-screen py-12 px-4 md:px-20 text-darkText">
      {/* Product Main Info */}
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
  <img
    src={product.image}
    alt={product.name}
    className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
  />

  <div>
    <h1 className="text-4xl font-extrabold text-primary mb-4">{product.name}</h1>

    {/* ⭐ Average Rating */}
    <div className="flex items-center gap-2 text-yellow-500 mb-4">
      <div className="flex text-xl">
        {"⭐".repeat(4)}<span className="opacity-50">⭐</span>
      </div>
      <span className="text-sm text-gray-500">(4.5 average rating)</span>
    </div>

    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>

    <div className="text-3xl font-bold text-accent mb-6">${product.price.toFixed(2)}</div>

    {/* Quantity Selector */}
    <div className="flex items-center gap-4 mb-6">
      <span className="text-md font-medium">Quantity:</span>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1">
        <button
          onClick={() => setQty((prev) => Math.max(1, prev - 1))}
          className="text-xl text-gray-600 hover:text-primary"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-[20px] text-center">{qty}</span>
        <button
          onClick={() => setQty((prev) => prev + 1)}
          className="text-xl text-gray-600 hover:text-primary"
        >
           <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>

    {/* Add to Cart */}
    <button
      onClick={() => alert(`Added ${qty} to cart!`)}
      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition"
    >
      Add {qty > 1 ? `${qty} to Cart` : "to Cart"}
    </button>
  </div>
</div>

      {/* What's Inside Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center my-20">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">What’s Inside</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            Each gummy is packed with essential vitamins and minerals tailored for kids' growth,
            including Vitamin A, C, D3, E, Zinc, and Omega-3 DHA. All ingredients are natural,
            non-GMO, and flavored with real fruit juice. Zero added sugar, no artificial dyes.
          </p>
        </div>
        <img
          src="https://rukminim2.flixcart.com/image/850/1000/xif0q/vitamin-supplement/1/h/k/60-multivitamin-gummies-for-kids-immunity-bones-brain-original-imaggtahssgbzzcf.jpeg?q=90&crop=false"
          alt="What's Inside"
          className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
        />
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold text-lg">⭐️⭐️⭐️⭐️⭐️</p>
            <p className="text-sm text-gray-600 mt-2">
              “My kids love the taste and I love that they’re actually getting their vitamins every day!”
            </p>
            <p className="mt-2 text-sm text-gray-400">– Sarah, NY</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold text-lg">⭐️⭐️⭐️⭐️</p>
            <p className="text-sm text-gray-600 mt-2">
              “Finally a gummy that doesn't upset my child’s stomach. Great product and fast delivery.”
            </p>
            <p className="mt-2 text-sm text-gray-400">– Mike, CA</p>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="max-w-6xl mx-auto mt-20">
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
