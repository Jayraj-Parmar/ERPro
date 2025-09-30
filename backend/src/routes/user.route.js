import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { getUserData } from "../controllers/user.controller.js";

const router = Router();

router.get("/data", userAuth, getUserData);

export default router;
