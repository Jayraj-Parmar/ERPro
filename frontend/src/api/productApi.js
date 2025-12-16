import API from "./apiClient";

export const getAllProductsApi = () => API.get("/product/");
export const createProductApi = (data) => API.post("/product/", data);
