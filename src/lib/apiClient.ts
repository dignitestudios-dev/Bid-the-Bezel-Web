import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;

    if (status === 401) {
      console.error("Unauthorized - redirect to login");

      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    if (status === 500) {
      console.error("Server error");
    }
    return Promise.reject(error);
  }
);