import axios from "axios";
export const apiClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
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
}
