import axios, { AxiosError } from "axios";
import { session } from "./session";
import { ROUTES } from "@/constants/routes";
import { env } from "./env";

export const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = session.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      session.removeToken();
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);
