// src/redux/axios/axiosInstance.js
import axios from 'axios';
const token = localStorage.getItem('token'); // Or use Redux if stored there

console.log('Request Config:', token);

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-backend-u12r.onrender.com/api/v1', // Use env variables in production
  withCredentials: true, // Required for cookies/session auth
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Optional: Add auth token if available
axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Global response error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
