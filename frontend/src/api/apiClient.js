import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Response Interceptor
API.interceptors.response.use(
  (response) =>
    Promise.resolve({
      status: response.status,
      data: response.data?.data,
      message: response.data?.message,
      success: response.data?.success,
    }),
  async (error) => {
    if (error.response) {
      const originalRequest = error.config;

      // Handle expired token
      if (
        error.response.data?.code === "ACCESS_TOKEN_EXPIRED" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await API.get("/auth/refresh-token");
          return API(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Handle normal backend errors
      return Promise.reject({
        status: error.response.status,
        data: error.response.data?.data,
        code: error.response.data?.code,
        message: error.response.data?.message || "Something went wrong",
        errors: error.response.data?.data?.errors || [],
      });
    } else if (error.request) {
      return Promise.reject({
        status: null,
        message: "No response from server. Please try again later.",
        errors: [],
      });
    } else {
      return Promise.reject({
        status: null,
        message: error.message,
        errors: [],
      });
    }
  }
);

export default API;
