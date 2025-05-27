import React, { useEffect, useState, useMemo } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../slices/productSlice';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { debounce } from 'lodash';

const Products = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    resultPerPage,
    totalProducts,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(keyword, currentPage));
  }, [dispatch, currentPage, keyword]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setCurrentPage(1);
        setKeyword(value);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </aside>

          {/* Products Section */}
          <main className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6">Our Products</h2>

            {products?.products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {products.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-2.5">
                      <img
                        src={`https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Link to={`/product/${product._id}`}>
                            <p className="text-lg font-semibold text-slate-800 line-clamp-1">
                              {product.name}
                            </p>
                          </Link>
                          <p className="text-primary text-md font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          <Rating
                            name={`rating-${product._id}`}
                            value={product.ratings}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                          <span className="text-sm text-gray-500">
                            ({product.numOfReviews})
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <button
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        type="button"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-lg py-10">
                No products found for{' '}
                <span className="font-semibold">"{keyword}"</span>
              </div>
            )}

            {totalProducts > resultPerPage && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={Math.ceil(totalProducts / resultPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
