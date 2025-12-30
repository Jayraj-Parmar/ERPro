import API from "./apiClient";

export const getVillagesBySubdistrictId = (subdistrictId) => {
  return API.get("/location/village", { params: { subdistrictId } });
};

export const getSubdistrictsByDistrictId = (districtId) => {
  return API.get("/location/subdistrict", { params: { districtId } });
};

export const getDistricts = () => {
  return API.get("/location/district");
};
