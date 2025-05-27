
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1', 
    withCredentials: true, /// Replace with your base URL
    
  maxContentLength: Infinity,
    maxBodyLength: Infinity
});

// Add interceptors for error handling globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error?.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;


