import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { getToken, removeToken } from "./cookies";

let queryClient: any = null;

export const setQueryClient = (client: any) => {
  queryClient = client;
};

// Create axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

let fpPromise: Promise<string> | null = null;

const getFingerprint = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => result.visitorId);
  }

  return fpPromise;
};

/* ---------------- REQUEST INTERCEPTOR ---------------- */

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getToken();

      // attach auth token
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // attach device info
      const deviceId = await getFingerprint();

      config.headers["deviceuniqueid"] = deviceId;
      config.headers["devicemodel"] = navigator.userAgent;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    const status = error.response?.status;

    // current request url
    const requestUrl = error.config?.url || "";

    // endpoints that should NOT trigger logout on 401
    const ignored401Endpoints = [
      "/update-fcm",
      "/fcm",
      "/register",
      "/login",
    ];

    const shouldIgnore401 = ignored401Endpoints.some((endpoint) =>
      requestUrl.includes(endpoint)
    );

    if (status === 401 && !shouldIgnore401) {
      console.error("Unauthorized - redirect to login");

      if (typeof window !== "undefined") {
        // remove token
        removeToken();

        // clear cached profile
        if (queryClient) {
          queryClient.invalidateQueries({
            queryKey: ["get-profile"],
          });
        }

        // redirect login
        window.location.href = "/?authstep=login";
      }
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

export default apiClient;