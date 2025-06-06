// components/Profile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserProfile,
  updateUserProfile,
  updateUserPassword,
  clearMessages,
} from '../redux/slices/users/profileSlice';
import { ShoppingCart, Star, Pencil, Upload, Heart, Lock } from 'lucide-react';

import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.profile);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Clear success/error messages after 5s
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="px-4 md:px-10 py-8 max-w-4xl mx-auto md:py-20">
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
        <img
          src={user?.avatar?.url || 'https://randomuser.me/api/portraits/men/32.jpg'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />

        <div className="flex-1 space-y-1 text-center md:text-left">
          <h2 className="text-2xl font-heading text-darkText">{user?.name || 'John Doe'}</h2>
          <p className="text-gray-600 text-sm">{user?.email || 'johndoe@gmail.com'}</p>
          <p className="text-gray-600 text-sm">{user?.phone || '+1 9856324648'}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition"
            aria-label="Edit Profile"
          >
            <Pencil size={16} /> Edit Profile
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1 bg-accent text-white px-4 py-2 rounded-full text-sm hover:bg-accent/90 transition"
            aria-label="Change Password"
          >
            <Lock size={16} /> Change Password
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        <div className="bg-lightBg p-4 rounded-xl shadow-sm">
          <ShoppingCart className="mx-auto mb-2 text-primary" />
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-xl font-bold">{user?.orders?.length || 0}</p>
        </div>

        <div className="bg-lightBg p-4 rounded-xl shadow-sm">
          <Star className="mx-auto mb-2 text-yellow-500" />
          <p className="text-sm text-gray-600">Reviews Given</p>
          <p className="text-xl font-bold">{user?.reviews?.length || 0}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-wrap justify-start gap-4">
        <button
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm"
          aria-label="My Orders"
        >
          My Orders
        </button>
        <button
          className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition text-sm flex items-center gap-1"
          aria-label="My Wishlist"
        >
          <Heart size={16} /> My Wishlist
        </button>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={(formData) => dispatch(updateUserProfile(formData))}
          loading={loading}
        />
      )}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={(passwordData) => dispatch(updateUserPassword(passwordData))}
          loading={loading}
        />
      )}

      {/* Messages */}
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>}
    </div>
  );
};

export default Profile;
