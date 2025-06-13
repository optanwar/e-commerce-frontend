import React, { useEffect, useState } from 'react';
import { PackageCheck, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/order/orderSlice';
import { createReview, resetReviewState } from '../redux/slices/reviews/reviewsSlice';
import Swal from 'sweetalert2';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders, loading, error } = useSelector((state) => state.order);
  const {
    loading: reviewLoading,
    success,
    error: reviewError,
  } = useSelector((state) => state.review);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [review, setReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Thank you for your review!',
        text: 'Your feedback has been submitted successfully.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then(() => {
        dispatch(resetReviewState());
        handleCloseModal();
      });
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (reviewError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: reviewError || 'Something went wrong while submitting your review.',
        confirmButtonColor: '#d33',
      });
    }
  }, [reviewError]);

  useEffect(() => {
    if (selectedOrder?.orderItems.length === 1) {
      setSelectedItemId(selectedOrder.orderItems[0].product);
    }
  }, [selectedOrder]);

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId('');
    setReview({ rating: 0, comment: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedItemId || !review.rating || !review.comment.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all fields before submitting your review.',
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    dispatch(
      createReview({
        productId: selectedItemId,
        rating: Number(review.rating),
        comment: review.comment.trim(),
      })
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <PackageCheck className="text-green-600" size={20} />;
      case 'Shipped':
        return <Truck className="text-blue-500" size={20} />;
      default:
        return <Truck className="text-gray-400" size={20} />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-8">My Orders</h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-10">{error}</p>
      ) : myOrders.length === 0 ? (
        <div className="text-center text-gray-600 py-16">You haven’t placed any orders yet.</div>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <p className="text-sm font-semibold text-darkText">
                    Order <span className="text-primary">#{order._id}</span>
                  </p>
                  <p className="text-xs text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="text-sm text-gray-700 w-full md:w-auto">
                  <p className="font-semibold mb-1">Items:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {order.orderItems.map((item) => (
                      <li key={item._id}>
                        <span className="font-medium">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start md:items-end text-sm font-medium gap-2">
                  <p>
                    Total: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    <span
                      className={`${
                        order.orderStatus === 'Delivered'
                          ? 'text-green-600'
                          : order.orderStatus === 'Shipped'
                          ? 'text-blue-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  {order.orderStatus === 'Delivered' && (
                    <button
                      onClick={() => handleOpenReview(order)}
                      className="text-sm mt-1 px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h3 className="text-lg font-bold text-darkText mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">
                  Select Product
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Choose an item</option>
                  {selectedOrder?.orderItems.map((item) => (
                    <option key={item._id} value={item.product}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Rating</label>
                <select
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && 's'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Comment</label>
                <textarea
                  rows={3}
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Share your experience"
                  required
                />
              </div>

              {reviewLoading && <p className="text-gray-500 text-sm">Submitting review...</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
