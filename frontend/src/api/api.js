// src/api/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("👉 API_BASE_URL:", API_BASE_URL);

if (!API_BASE_URL) {
  console.warn("Environment variable 'VITE_API_URL' is not defined. Check your .env file!");
}

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Global response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      console.warn("🚪 Unauthorized request – not authorized.");
    }
    return Promise.reject(error);
  }
);

export default API;
