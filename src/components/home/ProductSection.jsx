import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import  {fetchProducts } from "../../slices/productSlice";
import {Link} from 'react-router-dom';
 
const ProductSection = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  


  return (
    <div className="bg-[#EDF7FF]">
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="font-roboto text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          {/* Optional: <button className="font-roboto text-base text-primary hover:underline">All Products</button> */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
          {products && products?.products?.map((product) => (
        <div
  key={product._id}
  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto flex flex-col bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
>
  {/* Product Image */}
  <div className="w-full h-60 sm:h-64 md:h-72 lg:h-64 xl:h-60 overflow-hidden">
    <img
      src={`https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Product Details */}
  <div className="flex flex-col justify-between flex-1 p-4">
    <div>
      <div className="flex items-center justify-between mb-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <span className="text-primary font-semibold text-sm sm:text-base">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Rating
          name={`rating-${product._id}`}
          value={product.ratings}
          readOnly
          precision={0.5}
        />
        <span className="text-sm text-gray-500">
          ({product.numOfReviews})
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
    </div>

    <button
      className="mt-4 w-full bg-primary hover:bg-cyan-700 text-white font-medium py-2 rounded-md transition-colors duration-300"
      type="button"
    >
      Buy Now
    </button>
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
