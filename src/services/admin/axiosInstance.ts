import axios from "axios";
import { BASE_URL } from "../../constants";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});


api.interceptors.request.use(
  (config) => {
    config.headers.Authorization =`Bearer ${localStorage.getItem("adminAuth")}`;
    
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default api