import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/authValidators.js";
import { validator } from "../middlewares/validateRequest.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = Router();
router.post("/signup", signupValidator, validator, register);
router.post("/login", loginValidator, validator, login);
router.post("/verify-email", verifyEmail);
router.post("/send-verify-otp", sendVerifyOtp);
router.get("/refresh-token", refreshToken);
router.get("/logout", userAuth, logout);

export default router;
