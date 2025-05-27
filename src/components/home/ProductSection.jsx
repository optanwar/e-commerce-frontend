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
              className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full"
            >
              <div className="p-2.5 rounded-xl overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Link to={`/product/${product._id}`} className="">
                    <p className="text-slate-800 text-xl font-semibold">
                      {product.name}
                    </p>
                    </Link>
                    <p className="text-primary text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Rating
                      name={`rating-${product._id}`}
                      value={product.ratings}
                      readOnly
                      precision={0.5}
                    />
                    <span className="text-sm text-slate-500">({product.numOfReviews
                    })</span>
                  </div>
                  <p className="text-slate-600 font-light leading-normal">
                    {product.description}
                  </p>
                </div>
                <button
                  className=" rounded-md bg-primary py-2 px-4 text-sm text-white shadow-md transition-all hover:bg-cyan-700 focus:bg-cyan-700"
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
