import axios from "axios";
import { loginApi } from "../apis/LoginApi";

// Create an axios instance
const httpClient = axios.create({
  baseURL: "http://localhost:5081/api",
});

// Request interceptor to add bearer token
httpClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.token) {
          config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
        } else {
          console.warn("No token found in user object:", parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    } else {
      console.warn("User not found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token-related errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Helper functions for token management
export const setAuthToken = (token) => {
  if (token) {
    // Save token to local storage
    localStorage.setItem("authToken", token);
  } else {
    // Remove token from local storage
    localStorage.removeItem("authToken");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Export the configured axios instance
export default httpClient;
