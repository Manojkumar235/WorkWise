import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds for rural network conditions

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Network error helper
const isNetworkError = (error) => {
  return !error.response && (error.code === 'ECONNABORTED' || error.message === 'Network Error');
};

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('workwise_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error - don't redirect, let component handle
    if (isNetworkError(error)) {
      error.isNetworkError = true;
      return Promise.reject(error);
    }

    // 401 Unauthorized - token expired/invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('workwise_token');
      localStorage.removeItem('workwise_user');

      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      error.isForbidden = true;
    }

    // 500+ Server errors
    if (error.response?.status >= 500) {
      error.isServerError = true;
    }

    return Promise.reject(error);
  }
);

export default api;

// Export helper for components
export { isNetworkError };
