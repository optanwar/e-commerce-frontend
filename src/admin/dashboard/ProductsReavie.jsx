import React, { useState } from 'react';
import { Search, Pencil, Trash2, MessagesSquare } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, deleteReview } from '../../redux/slices/reviews/reviewsSlice';

const DashboardReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.review);

  const [productId, setProductId] = useState('');
  const [editReview, setEditReview] = useState(null);

  const handleSearch = () => {
    if (productId.trim()) {
      dispatch(getProductReviews(productId.trim()));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Frontend only update simulation
    const updated = reviews.map((r) => (r._id === editReview._id ? editReview : r));
    setEditReview(null);
    // Ideally dispatch updateReview thunk here for real API update
  };

  const handleDelete = (id) => {
    if (!productId) {
      alert('Please search a product first to get its reviews.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview({ productId, reviewId: id }))
        .unwrap()
        .then(() => {
          dispatch(getProductReviews(productId.trim()));
        })
        .catch((err) => {
          alert(`Failed to delete review: ${err}`);
        });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <MessagesSquare className="text-primary" />
        Product Reviews
      </h1>

      {/* Search */}
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Enter Product ID..."
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Review Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">Name</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Loading reviews...
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading && reviews.length === 0 && !error && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
            {reviews.map((review) => (
              <tr key={review._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{review.name}</td>
                <td className="p-4">{review.rating} ⭐</td>
                <td className="p-4">{review.comment}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => setEditReview(review)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editReview && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-700">Edit Review</h2>

            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                value={editReview.name}
                onChange={(e) => setEditReview({ ...editReview, name: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editReview.rating}
                onChange={(e) =>
                  setEditReview({
                    ...editReview,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Comment</label>
              <textarea
                value={editReview.comment}
                onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditReview(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashboardReviews;
