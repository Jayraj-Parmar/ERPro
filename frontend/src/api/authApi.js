import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

//error
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
      if (
        error.response.data?.code === "ACCESS_TOKEN_EXPIRED" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await API.get("/auth/refresh-token"); // refresh token route
          return API(originalRequest); // retry original request
        } catch (err) {
          return Promise.reject(err); // refresh failed
        }
      }
      return Promise.reject({
        // Backend returned an error (422, 400, 500... or error > 400)
        status: error.response.status,
        data: error.response.data?.data,
        code: error.response.data?.code,
        message: error.response.data?.message || "Something went wrong",
        errors: error.response.data?.data?.errors || [],
      });
    } else if (error.request) {
      // No response from backend (network error, server down)
      return Promise.reject({
        status: null,
        message: "No response from server. Please try again later.",
        errors: [],
      });
    } else {
      // Something wrong in request setup
      return Promise.reject({
        status: null,
        message: error.message,
        errors: [],
      });
    }
  }
);

// Signup
export const signup = (formData) => API.post("/auth/signup", formData);
// Login
export const login = (formData) => API.post("/auth/login", formData);
// Verify Email
export const resendEmail = (data) => API.post("/auth/verify-email", data);
// Resend OTP
export const sendOtp = (data) => API.post("/auth/send-verify-otp", data);
// Get User data
export const getUser = () => API.get("/user/data");
// Logout
export const logout = () => API.get("/auth/logout");
