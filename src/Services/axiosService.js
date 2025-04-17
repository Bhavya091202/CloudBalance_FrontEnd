import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../redux/store";
import { clearUserData } from "../redux/action";
import toast from "react-hot-toast";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptors for response for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      store.dispatch(clearUserData());
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    }

    const customError = {
      status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };

    return Promise.reject(customError);
  }
);


const apiClient = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
};

export default apiClient;

