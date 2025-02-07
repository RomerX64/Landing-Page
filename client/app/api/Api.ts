// utils/api.ts
import axios from "axios";

const API_URL =
  typeof window === "undefined" || process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // Para entorno de desarrollo
    : "https://assetly-landing-page-backend.onrender.com"; // Para entorno de producción

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
