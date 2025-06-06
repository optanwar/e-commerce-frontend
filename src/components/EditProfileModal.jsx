// components/EditProfileModal.js
import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';

const EditProfileModal = ({ user, onClose, onSave, loading }) => {
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Initialize edit data from user
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Generate image preview
  useEffect(() => {
    if (newImage) {
      const url = URL.createObjectURL(newImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl('');
  }, [newImage]);

  const isValidPhone = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return re.test(phone);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editData.name.trim()) {
      alert('Name cannot be empty');
      return;
    }

    if (editData.phone && !isValidPhone(editData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    const formData = new FormData();
    formData.append('name', editData.name.trim());
    formData.append('phone', editData.phone.trim());
    if (newImage) {
      formData.append('avatar', newImage);
    }

    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editProfileTitle"
    >
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative">
        <h3 id="editProfileTitle" className="text-xl font-heading mb-4 text-darkText">
          Edit Profile
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <img
              src={
                previewUrl ||
                user?.avatar?.url ||
                'https://randomuser.me/api/portraits/men/32.jpg'
              }
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <label
              htmlFor="avatarUpload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded flex items-center gap-2"
            >
              <Upload size={16} /> Upload Image
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-darkText">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>

          {/* Email Field (disabled) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-darkText">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editData.email}
              disabled
              className="w-full border border-gray-200 bg-gray-100 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 text-darkText">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="+1234567890"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading
                  ? 'bg-primary/70 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
