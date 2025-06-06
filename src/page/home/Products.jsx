import React, { useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { fetchProducts } from '../../redux/slices/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
const Projects = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section className="py-10 sm:py-12 sm:px-6 md:px-8 md:py-16 lg:py-20 xl:py-24 2xl:py-28 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-center text-secondary mb-10">Best Sellers</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products &&
            products?.length > 0 &&
            products.slice(0, 3).map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-soft p-4 relative hover:shadow-hoverCard transition border  border-primary border-dotted"
              >
                {/* Favorite Icon */}
                <button className="absolute top-6 right-6 text-gray-400 hover:text-primary transition">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Product Image */}
                <img
                  src="https://images.pexels.com/photos/14433536/pexels-photo-14433536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt={`Gummy ${product.name}`}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />

                {/* Product Title */}
                <Link to={`/products/${product._id}`}>
                  {' '}
                  <h3 className="text-lg font-heading text-accent mb-1">{product.name}</h3>{' '}
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-1">
                  {/* Current Price */}
                  <p className="text-lg font-bold text-primary tracking-wider">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Optional: Old Price if discounted */}
                  {product.price && (
                    <p className="text-sm text-gray-400 line-through">
                    ${(Number(product.price) + 19).toFixed(2)}
                    </p>
                  )}

                  {/* Optional: Sale Badge */}
                  {product.oldPrice && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-full">
                    <Rating
                      name="read-only"
                      size="small"
                      value={product.ratings}
                      readOnly
                      precision={0.5}
                    />
                    <span className="text-xs text-yellow-700 font-medium">
                      {product.ratings.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">({product.numOfReviews} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-sm text-darkText">{product.title}</p>

                {/* Add to Cart Button */}
                <button className="mt-4 bg-primary text-white w-full py-2 rounded-lg font-bold hover:bg-[#e25555] transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
