import express from "express";
import {
  getDistricts,
  getSubdistrictsByDistrictId,
  getVillagesBySubdistrictId,
} from "../controllers/location.controller.js";

const router = express.Router();

router.get("/district", getDistricts);
router.get("/subdistrict", getSubdistrictsByDistrictId);
router.get("/village", getVillagesBySubdistrictId);

export default router;
