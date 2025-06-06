import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../redux/slices/product/productDetailSlice';
import { addToCart, calculateTotals } from '../../redux/slices/cart/cartSlice';
import { Rating } from '@mui/material';

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetail);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      quantity: qty,
    }));

    dispatch(calculateTotals());
  };

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-red-500">Product not found</p>
      </main>
    );
  }

  return (
    <main className="bg-lightBg min-h-screen py-12 px-4 md:px-20 text-darkText">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={product.images?.[0]?.url || 'https://rukminim2.flixcart.com/image/850/1000/xif0q/vitamin-supplement/1/h/k/60-multivitamin-gummies-for-kids-immunity-bones-brain-original-imaggtahssgbzzcf.jpeg'}
          alt={product.name}
          className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-full shadow-sm">
              <Rating
                name="read-only"
                size="small"
                value={product.ratings}
                readOnly
                precision={0.5}
              />
              <span className="text-sm text-yellow-700 font-medium">
                {product.ratings.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-600">({product.numOfReviews} reviews)</span>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          <div className="text-3xl font-bold text-accent mb-6">${product.price.toFixed(2)}</div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-md font-medium">Quantity:</span>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                disabled={qty <= 1}
                className="text-xl text-gray-600 hover:text-primary disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[20px] text-center">{qty}</span>
              <button
                onClick={() => setQty((prev) => Math.min(product.stock, prev + 1))}
                disabled={qty >= product.stock}
                className="text-xl text-gray-600 hover:text-primary disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {product.stock === 0 ? 'Out of Stock' : `Add ${qty > 1 ? qty : ''} to Cart`}
          </button>
        </div>
      </div>

      {/* What's Inside */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center my-20">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">What’s Inside</h2>
          <p className="text-md text-gray-700 leading-relaxed">{product.description2}</p>
        </div>
        <img
          src="https://rukminim2.flixcart.com/image/850/1000/xif0q/vitamin-supplement/1/h/k/60-multivitamin-gummies-for-kids-immunity-bones-brain-original-imaggtahssgbzzcf.jpeg"
          alt="What's Inside"
          className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
        />
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="max-w-6xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-xl shadow">
                <Rating
                  name="read-only"
                  size="medium"
                  value={review.rating}
                  readOnly
                  precision={0.5}
                />
                <p className="text-sm text-gray-600 mt-2">“{review.comment}”</p>
                <p className="mt-2 text-sm text-gray-400">
                  – {review?.name || 'Anonymous'}, {review?.createdAt && new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {products && product && products.filter(p => p.category === product.category && p._id !== id).length > 0 && (
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-2xl font-semibold text-primary mb-6">Other Gummies You May Like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p._id !== id)
              .slice(0, 4)
              .map(p => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden group"
                >
                  <img
                    src={p.images?.[0]?.url || 'https://rukminim2.flixcart.com/image/850/1000/xif0q/vitamin-supplement/1/h/k/60-multivitamin-gummies-for-kids-immunity-bones-brain-original-imaggtahssgbzzcf.jpeg'}
                    alt={p.name}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <Link to={`/products/${p._id}`}>
                      <h3 className="text-lg font-heading text-accent mb-1">{p.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</p>
                    <p className="mt-2 text-accent font-bold">${p.price?.toFixed(2) ?? '0.00'}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}
