import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors can be added here for request/response handling

export default client;