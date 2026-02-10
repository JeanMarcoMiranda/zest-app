import axios from "axios";

const SPOONACULAR_API_KEY = "dbe4d8306b754f5b838e3951c4b400f6"; // TODO: Reemplazar con la API Key real

export const apiClient = axios.create({
  baseURL: "https://api.spoonacular.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": SPOONACULAR_API_KEY,
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
