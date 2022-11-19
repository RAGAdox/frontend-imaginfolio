import axios from "axios";
import { env } from "./env";
console.log("API=>", env.REACT_APP_BACKEND_API);
const instance = axios.create({
  baseURL: env.REACT_APP_BACKEND_API,
  timeout: 800000,
});

let interceptor: number;

export const setBearerToken = (token: string) => {
  interceptor = instance.interceptors.request.use((config) => {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
export const resetBearerToken = () => {
  instance.interceptors.request.eject(interceptor);
};
export default instance;
