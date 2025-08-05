import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080',
  const baseURL = process.env.REACT_APP_API_URL;

  withCredentials: true, // Needed only if using cookies; optional here
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


