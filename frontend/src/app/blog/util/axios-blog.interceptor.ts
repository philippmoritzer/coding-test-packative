import axios from "axios";
import { httpErrorMessages } from "../errors/httpErrors";
import { store } from "@/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosBlogInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBlogInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.authString || "";
  config.headers.Authorization = token;
  return config;
});

axiosBlogInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorKey = httpErrorMessages[status] || "error.default";
    return Promise.reject(new Error(errorKey));
  }
);

export default axiosBlogInstance;
