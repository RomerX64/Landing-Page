// utils/api.ts
import axios from "axios";

const prod = false;
const urlWeb = "https://assetly-landing-page-backend.onrender.com/";
const API_URL = prod ? urlWeb : "http://localhost:3000";

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

api.interceptors.response.use(
  (response) => response, // Devuelve la respuesta normalmente si es exitosa
  (error) => {
    // Asegura que los errores sigan siendo tratados como errores
    return Promise.reject(error);
  }
);

export default api;
