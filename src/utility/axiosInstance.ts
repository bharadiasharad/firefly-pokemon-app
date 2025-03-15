import axios from 'axios';
import { BASE_URL } from './constants';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add token to the headers of every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
