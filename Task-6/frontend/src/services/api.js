import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  if (response.data && response.data.data && response.data.data.token) {
    localStorage.setItem('userToken', response.data.data.token);
  }
  return response.data.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  if (response.data && response.data.data && response.data.data.token) {
    localStorage.setItem('userToken', response.data.data.token);
  }
  return response.data.data;
};

// User API calls
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// AI Agent API call
export const askAIAgent = async (question) => {
  const response = await api.post('/ai/ask', { question });
  return response.data;
};

export default api;