import API from "./apiClient";

export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const resendEmail = (data) => API.post("/auth/verify-email", data);
export const sendOtp = (data) => API.post("/auth/send-verify-otp", data);
export const getUser = () => API.get("/user/data");
export const logout = () => API.get("/auth/logout");
export const refreshToken = () => API.get("/auth/refresh-token");
