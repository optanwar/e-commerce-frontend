import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../slices/authSlice'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated} = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    if (!formData.password.trim()) validationErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      validationErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    dispatch(signupUser(formData));
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
