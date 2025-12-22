import axios from 'axios';

// Create an Axios instance with a base URL for the API.
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add a request interceptor to include the JWT token in headers.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
