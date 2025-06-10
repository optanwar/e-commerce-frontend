import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LockKeyhole, LoaderCircle } from 'lucide-react';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useParams(); // URL should be like: /password/reset/:token
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/password/reset/${token}`,
        form
      );
      setMessage(data.message || 'Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <LockKeyhole className="text-primary" />
          <h2 className="text-2xl font-bold text-darkText">Reset Your Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-darkText mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-darkText mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary"
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition flex items-center justify-center"
          >
            {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : 'Reset Password'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
