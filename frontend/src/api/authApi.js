import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/api" });

//error
API.interceptors.response.use(
  (response) =>
    Promise.resolve({
      status: response.status,
      data: response.data?.data,
      message: response.data?.message,
      success: response.data?.success,
    }),
  (error) => {
    if (error.response) {
      return Promise.reject({
        // Backend returned an error (422, 400, 500... or error > 400)
        status: error.response.status,
        data: error.response.data?.data,
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
export const signupUser = (formData) => API.post("/user/signup", formData);

export const resendEmail = (userEmail) =>
  API.post("/user/resend-email", userEmail);
