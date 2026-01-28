import axios from "axios";

const api = axios.create({
  baseURL: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
