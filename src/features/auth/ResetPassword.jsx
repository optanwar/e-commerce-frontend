import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPassword,
  clearPasswordError,
  clearPasswordMessage,
} from '../../redux/slices/auth/passwordSlice';
import { LockKeyhole, LoaderCircle } from 'lucide-react';
import Swal from 'sweetalert2'; // ✅ SweetAlert2

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, loading, error, message } = useSelector((state) => state.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, ...form }));
  };

  // ✅ SweetAlert for success + redirect
  useEffect(() => {
    if (success === true && !error) {
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Redirecting to login...',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        dispatch(clearPasswordMessage());
        navigate('/login');
      });
    }
  }, [success, error, dispatch, navigate]);

  // ✅ SweetAlert for error
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: error,
      });
      dispatch(clearPasswordError());
    }
  }, [error, dispatch]);

  // Clear any old error on mount
  useEffect(() => {
    dispatch(clearPasswordError());
  }, [dispatch]);

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

        {/* Optional message UI (can be removed if using SweetAlert only) */}
        {message && !error && (
          <p className="mt-4 text-sm text-center text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
