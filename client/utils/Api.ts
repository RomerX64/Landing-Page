import axios from "axios";

const url =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://landing-page-production-70bc.up.railway.app";

const api = axios.create({
  baseURL: url, //process.env.NEXT_PUBLIC_API_URL,
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
