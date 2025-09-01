import { Router } from "express";
import {
  handleSignup,
  verifyEmail,
  resendEmail,
} from "../controllers/user.controller.js";
import { validator } from "../middlewares/validateRequest.js";
import { signupValidator } from "../validators/authValidator.js";

const router = Router();

router.post("/signup", signupValidator, validator, handleSignup);

router.get("/verify-email/:verificationToken", verifyEmail);

router.post("/resend-email", resendEmail);

export default router;
