import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  clearError,
} from '../../redux/slices/auth/loginSlice';
import { forgotPassword } from '../../redux/slices/auth/passwordSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Forgot Password
  const [forgotEmail, setForgotEmail] = useState('');

  const { user, loading, error, isAuthenticated, token } = useSelector(
    (state) => state.auth
  );

  // Redirect to homepage on login/register success
  useEffect(() => {
    if (isAuthenticated && user && token) {
      Swal.fire({
        icon: 'success',
        title: `Welcome ${user.name || 'back'}!`,
        text: 'You are now logged in.',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    }
  }, [isAuthenticated, user, token, navigate]);

  // Show error popup
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: error,
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }, [error]);

  // Clear error on tab switch
  useEffect(() => {
    dispatch(clearError());
  }, [activeTab, dispatch]);

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email: regEmail, password: regPassword }));
  };

  // Handle Forgot Password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(forgotEmail));
    Swal.fire({
      icon: 'info',
      title: 'Check your inbox',
      text: `Reset link sent to ${forgotEmail}`,
      timer: 2500,
      showConfirmButton: false,
    });
    setShowForgotPassword(false);
  };

  const handleGoogleAuth = () => {
    Swal.fire('Info', 'Google Auth is not implemented.', 'info');
  };

  const handleFacebookAuth = () => {
    Swal.fire('Info', 'Facebook Auth is not implemented.', 'info');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-lightBg px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          Welcome to YummyGummies🍬
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            onClick={() => {
              setActiveTab('login');
              setShowForgotPassword(false);
            }}
            className={`flex-1 py-2 text-center font-semibold transition-colors ${
              activeTab === 'login'
                ? 'border-b-4 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setShowForgotPassword(false);
            }}
            className={`flex-1 py-2 text-center font-semibold transition-colors ${
              activeTab === 'register'
                ? 'border-b-4 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Forgot Password */}
        {showForgotPassword ? (
          <form className="space-y-5" onSubmit={handleForgotSubmit}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Enter your email
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : activeTab === 'login' ? (
          // Login Form
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <SocialLoginSection
              activeTab={activeTab}
              onGoogle={handleGoogleAuth}
              onFacebook={handleFacebookAuth}
            />
          </form>
        ) : (
          // Register Form
          <form className="space-y-5" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <SocialLoginSection
              activeTab={activeTab}
              onGoogle={handleGoogleAuth}
              onFacebook={handleFacebookAuth}
            />
          </form>
        )}
      </div>
    </main>
  );
}

const SocialLoginSection = ({ activeTab, onGoogle, onFacebook }) => (
  <>
    <div className="flex items-center my-4">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-3 text-gray-400">or</span>
      <hr className="flex-grow border-gray-300" />
    </div>
    <div className="space-y-3">
      <button
        type="button"
        onClick={onGoogle}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
      >
        <img
          src="https://sm.pcmag.com/pcmag_me/review/g/google-doc/google-docs-sheets-and-slides_f6we.png"
          alt="Google logo"
          className="w-6 h-6"
        />
        {activeTab === 'login' ? 'Log in with Google' : 'Sign up with Google'}
      </button>
      <button
        type="button"
        onClick={onFacebook}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692V11.31h3.128V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.395h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .594 23.405 0 22.675 0z" />
        </svg>
        {activeTab === 'login'
          ? 'Log in with Facebook'
          : 'Sign up with Facebook'}
      </button>
    </div>
  </>
);
