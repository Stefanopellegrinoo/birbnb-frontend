
import axios from "axios";

export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_API_RENDER_URL;


const api = axios.create({
  baseURL: URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Request-Time"] = new Date().toISOString();

  return config;
})

export default api;
