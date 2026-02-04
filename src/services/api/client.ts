import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 30000, // Aumentado a 30 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para logging en desarrollo
if (__DEV__) {
  apiClient.interceptors.request.use(
    (config) => {
      console.log("API Request:", config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error("API Request Error:", error);
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response) => {
      console.log("API Response:", response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error("API Response Error:", {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        status: error.response?.status,
      });
      return Promise.reject(error);
    },
  );
}
