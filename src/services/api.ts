import axios from "axios";
import { demoApiAdapter } from "@/demo/mockApi";

const api = axios.create({
  baseURL: "/api",
  adapter: demoApiAdapter,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

export default api;
