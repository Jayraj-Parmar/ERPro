import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { sendMail } from "../utils/mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getCookieOptions } from "../utils/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email }).select(
    "-password -refreshToken"
  );

  //Case-1: User is exist and already verify.-Done
  if (userExist && userExist.isVerified) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "User already exists, please login."));
  }

  //Case-2: User is exist but does not verified.-Done
  if (userExist && !userExist.isVerified) {
    const otp = await userExist.generateVerificationOtp();
    await userExist.save();

    await sendMail(
      userExist.email,
      "Verify your email address for ERPro",
      `<p>Verification OTP is: ${otp}</p>
      <p>This OTP will expire in ${process.env.VERIFICATION_OTP_EXPIRY} minutes.</p>`
    );

    return res
      .status(202)
      .json(
        new ApiResponse(
          202,
          null,
          "An account with this email already exists but hasn't been verified. Please check your inbox to verify your email."
        )
      );
  }

  //Case-3: New User.-Done
  const newUser = await User.create({ name, email, password });
  const isCreated = await User.findById(newUser._id).select("-password");

  if (!isCreated) {
    throw new ApiError(
      500,
      "An unexpected error occurred during user signup. Please try again."
    );
  }

  const otp = await newUser.generateVerificationOtp();
  await newUser.save();

  await sendMail(
    newUser.email,
    "Verify your email address for ERPro",
    `<p>Verification OTP is: ${otp}</p>.
      <p>This OTP will expire in ${process.env.VERIFICATION_OTP_EXPIRY} minutes.</p>`
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "User registered. Please check your inbox to verify your email."
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //User does not exist.-Done
  if (!user) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, null, "Invalid email or User does not exist.")
      );
  }

  //Check Password.-Done
  const isCorrectPassword = await user.isPasswordCorrect(password);
  if (!isCorrectPassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid Password."));
  }

  //User exist but has't verified.-Done
  if (!user.isVerified) {
    const otp = await user.generateVerificationOtp();
    await user.save();

    await sendMail(
      user.email,
      "Verify your email address for ERPro",
      `<p>Verification OTP is: ${otp}</p>.
      <p>This OTP will expire in ${process.env.VERIFICATION_OTP_EXPIRY} minutes.</p>`
    );

    return res
      .status(202)
      .json(
        new ApiResponse(
          202,
          null,
          "Your email does not verified, please verify your email."
        )
      );
  }

  //Genrates Access Token
  const accessToken = await user.generateAccessToken();

  //Store cookie token in cookie.-Done
  res.cookie(
    "accessToken",
    accessToken,
    getCookieOptions(process.env.ACCESS_TOKEN_COOKIE_EXPIRY, "access")
  );

  //Genrates refresh Token and store in DB.-Done
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  //Store refresh token in cookie.-Done
  res.cookie(
    "refreshToken",
    refreshToken,
    getCookieOptions(
      process.env.REFRESH_TOKEN_COOKIE_EXPIRY * 24 * 60,
      "refresh"
    )
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged in successfully"));
});

export const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token)
    return res.status(401).json(new ApiResponse(401, null, "No refresh token"));

  const user = await User.findOne({ refreshToken: token });

  if (!user)
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Invalid refresh token"));

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = await user.generateAccessToken();

    res.cookie(
      "accessToken",
      newAccessToken,
      getCookieOptions(process.env.ACCESS_TOKEN_COOKIE_EXPIRY, "access")
    );

    return res.status(200).json(new ApiResponse(200, null, "Token refreshed"));
  } catch (err) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Refresh token expired"));
  }
};

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", getCookieOptions(null, "access"));
  res.clearCookie("refreshToken", getCookieOptions(null, "refresh"));
  const user = await User.findByIdAndUpdate(req.user?._id, {
    refreshToken: null,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email }).select("-password -refreshToken");
  //User does not exist.-Done
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User Not found."));
  }

  //User has not OTP.-Done
  if (!user.verificationOtp) {
    return res.status(400).json(new ApiResponse(400, null, "OTP not found."));
  }

  //exeed time limit.-Done
  if (Date.now() > user.verificationOtpExpiry) {
    user.verificationOtp = "";
    user.verificationOtpExpiry = 0;
    await user.save();
    return res.status(403).json(new ApiResponse(403, null, "OTP expired."));
  }

  //encrypt entered OTP.
  const hasedEnteredOtp = crypto.createHash("sha256").update(otp).digest("hex");

  //OTP does not match with existing OTP.-Done
  if (user.verificationOtp !== hasedEnteredOtp) {
    return res.status(403).json(new ApiResponse(403, null, "Invalid OTP."));
  }

  //OTP match.-Done
  user.isVerified = true;
  user.verificationOtp = "";
  user.verificationOtpExpiry = 0;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Email Verified Successfully."));
});

export const sendVerifyOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select("-password -refreshToken");

  // User does not exist-Done
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User Not found."));
  }

  // If user already verified-Done
  if (user.isVerified) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User is already verified."));
  }

  // If OTP still valid, don't resend-Done
  if (Date.now() < user.verificationOtpExpiry) {
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          null,
          `OTP already sent. Please try again after ${process.env.VERIFICATION_OTP_EXPIRY} minutes.`
        )
      );
  }

  // Resend OTP-Done
  const otp = await user.generateVerificationOtp();
  await user.save();

  await sendMail(
    user.email,
    "Verify OTP",
    `<p>Your verification OTP is: <b>${otp}</b></p>
     <p>This OTP will expire in ${process.env.VERIFICATION_OTP_EXPIRY} minutes.</p>`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP resent successfully."));
});
