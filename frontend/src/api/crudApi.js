import API from "./apiClient";

export const getAll = (endpoint) => API.get(`/${endpoint}`);
export const create = (endpoint, data) => API.post(`/${endpoint}`, data);
export const update = (endpoint, id, data) =>
  API.put(`/${endpoint}/${id}`, data);
export const remove = (endpoint, id) => API.delete(`/${endpoint}/${id}`);
