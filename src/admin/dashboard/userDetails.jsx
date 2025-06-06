import React, { useEffect } from 'react';
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Fingerprint,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
  UserCog,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../redux/slices/users/userDetailsSlice';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetailsAdmin);

  console.log('User Details:', user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user details available.</p>;
  }

  const orders = [
    {
      _id: 'order_001',
      totalPrice: 29.99,
      status: 'delivered',
      createdAt: '2025-06-01T12:34:00Z',
    },
    {
      _id: 'order_002',
      totalPrice: 15.5,
      status: 'pending',
      createdAt: '2025-06-02T15:45:00Z',
    },
  ];

  const reviews = [
    {
      _id: 'review_001',
      productName: 'Vitamin C Gummies',
      rating: 5,
      comment: 'My kids love it! Tastes great.',
    },
    {
      _id: 'review_002',
      productName: 'Omega 3 Gummies',
      rating: 4,
      comment: 'Nice texture and fruity flavor.',
    },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* User Info */}
      <div className="bg-white rounded-xl shadow-soft p-6 md:p-10 text-darkText">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 font-heading text-primary">
          User Profile
        </h1>

        {/* Profile Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Fingerprint className="text-secondary" />
              <span className="font-semibold">User ID:</span> {user?._id}
            </div>
            <div className="flex items-center gap-3">
              <User className="text-secondary" />
              <span className="font-semibold">Name:</span> {user?.name}
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-secondary" />
              <span className="font-semibold">Email:</span> {user?.email}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-secondary" />
              <span className="font-semibold">Phone:</span> {user?.phone}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-secondary" />
              <span className="font-semibold">Joined:</span> {user?.joined}
            </div>
            <div className="flex items-center gap-3">
              {user.role === 'admin' && <ShieldCheck className="text-secondary" />}
              {user.role === 'user' && <User className="text-secondary" />}
              {user.role === 'moderator' && <UserCog className="text-secondary" />}
              <span className="font-semibold">Role:</span>
              <span className="capitalize text-accent">{user?.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm mt-1">
                Status:{' '}
                <span
                  className={`font-semibold ${user.status === 'active' ? 'text-green-600' : 'text-red-500'}`}
                >
                  {user.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-lightBg p-4 rounded-xl shadow-sm">
            <ShoppingCart className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-600">2 Orders</p>
            <p className="text-xl font-bold">{user.orders}</p>
          </div>

          <div className="bg-lightBg p-4 rounded-xl shadow-sm">
            <Star className="mx-auto mb-2 text-yellow-500" />
            <p className="text-sm text-gray-600">3 Reviews</p>
            <p className="text-xl font-bold">{user.reviews}</p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-semibold text-primary mb-4">User Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-md">
                <p className="text-sm text-gray-800">
                  Order ID: <span className="font-mono">{order._id}</span>
                </p>
                <p className="text-sm">Total: ${order.totalPrice.toFixed(2)}</p>
                <p className="text-sm">
                  Status: <span className="capitalize">{order.status}</span>
                </p>
                <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-semibold text-primary mb-4">User Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews found.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-md">
                <p className="font-semibold">{review.productName}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating} ⭐</p>
                <p className="text-sm mt-1">"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
