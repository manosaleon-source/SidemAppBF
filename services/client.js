import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3033/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors can be added here for request/response handling

export default client;

// Add a request interceptor to include Authorization header if token stored locally
client.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // localStorage may not be available during SSR — ignore
  }
  return config;
}, (error) => Promise.reject(error));