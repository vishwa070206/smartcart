import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for authentication and error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Clear token & redirect if not on login page
        console.warn('Unauthorized request. Redirecting to login.');
      } else if (status === 403) {
        console.error('Forbidden access');
      }
    }
    return Promise.reject(error);
  }
);

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
