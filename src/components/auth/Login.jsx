import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, forgotPasswordUser, setCredentials } from '../../slices/authSlice'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [resetError, setResetError] = useState('');

  const { loading, error, isAuthenticated, token , user} = useSelector((state) => state.auth);
  console.log('token:', token);
  

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // ✅ Redirect to homepage after login
    }
    
  }, [isAuthenticated, navigate]);

  // Validate form inputs
  const validateLogin = () => {
    const errors = {};
    if (!loginData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!loginData.password) {
      errors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateForgot = () => {
    if (!forgotEmail) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(forgotEmail)) return 'Email is invalid';
    return null;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      await dispatch(loginUser(loginData)).unwrap();
       dispatch(setCredentials({ token: token , user: user }));
      alert('Login successful!');
      setLoginData({ email: '', password: '' });
      setFormErrors({});
    } catch (err) {
      console.error(err);
    }
  };

  // Handle forgot password
  const handleSendReset = async (e) => {
    e.preventDefault();
    const errorMsg = validateForgot();
    if (errorMsg) {
      setResetError(errorMsg);
      return;
    }

    try {
      await dispatch(forgotPasswordUser(forgotEmail)).unwrap();
      alert('Password reset email sent!');
      setShowModal(false);
      setForgotEmail('');
      setResetError('');
    } catch (err) {
      setResetError(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} noValidate>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`}
            required
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className={`w-full p-2 border rounded ${formErrors.password ? 'border-red-500' : ''}`}
            required
          />
          {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="text-right mb-3">
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
              setResetError('');
            }}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={handleSendReset}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className={`w-full p-2 mb-2 border rounded ${resetError ? 'border-red-500' : ''}`}
                required
              />
              {resetError && <p className="text-red-500 text-sm mb-2">{resetError}</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForgotEmail('');
                    setResetError('');
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
