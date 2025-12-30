import { District } from "../models/district.model.js";
import { SubDistrict } from "../models/subdistricts.model.js";
import { Village } from "../models/village.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVillagesBySubdistrictId = asyncHandler(async (req, res) => {
  const subdistrictID = Number(req.query.subdistrictId);

  if (!subdistrictID) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Subdistrict is required"));
  }

  const data = await Village.find({ subdistrict_code: subdistrictID });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Villages fetched successfully"));
});

const getSubdistrictsByDistrictId = asyncHandler(async (req, res) => {
  const districtID = Number(req.query.districtId);

  if (!districtID) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "District is required"));
  }

  const data = await SubDistrict.find({ district_code: districtID });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Subdistricts fetched successfully"));
});

const getDistricts = asyncHandler(async (req, res) => {
  const data = await District.find();

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Districts fetched successfully"));
});

export {
  getVillagesBySubdistrictId,
  getSubdistrictsByDistrictId,
  getDistricts,
};
