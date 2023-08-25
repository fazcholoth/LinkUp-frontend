import axios from "axios";
import { BASE_URL } from "../../constants";

export const api = axios.create({
  baseURL:BASE_URL ,
});


api.interceptors.request.use(
  (config) => {
    config.headers.Authorization =`Bearer ${localStorage.getItem("userAuth")}`;
    
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default api