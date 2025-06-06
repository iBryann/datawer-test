import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
