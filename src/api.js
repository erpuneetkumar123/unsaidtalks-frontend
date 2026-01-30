import axios from "axios";

const envApi =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : ((typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL)
        ? process.env.REACT_APP_API_URL
        : undefined);

const baseURL =
  envApi ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://unsaidtalks-backend.onrender.com/api");

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default api;
