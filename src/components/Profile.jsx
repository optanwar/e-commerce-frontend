// components/Profile.jsx
import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Ayaan Sharma',
    email: 'ayaan@example.com',
    phone: '+1 234 567 8901',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User:', user);
  };

  return (
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-2xl font-heading text-primary mb-6">My Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-darkText mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-darkText mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-darkText mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
