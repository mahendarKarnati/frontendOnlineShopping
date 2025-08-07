import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: baseURL, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// ✅ Add token to every request
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
