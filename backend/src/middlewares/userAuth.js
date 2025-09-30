import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json(
        new ApiResponse(401, null, "Not logged in.", "ACCESS_TOKEN_EXPIRED")
      );
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select(
      "-password -refreshToken -verificationOtp -verificationOtpExpiry -createdAt -updatedAt"
    );

    if (!req.user) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found."));
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid or expired token."));
  }
};
