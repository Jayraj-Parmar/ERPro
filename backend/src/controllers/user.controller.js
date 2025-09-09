import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { sendMail } from "../utils/mail.js";
import jwt from "jsonwebtoken";

const handleSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const now = Date.now();
  const existingUser = await User.findOne({ email }).select("-password");
  // Case 2: User exists and verified
  if (existingUser && existingUser.isVerified === true) {
    if (!existingUser.refreshToken) {
      return res.status(409).json(
        new ApiResponse(
          409,
          {
            email: existingUser.email,
            redirectTo: "/login",
          },
          "User already exists. Please login."
        )
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { redirectTo: "/" }, "User already exists."));
  }
  // Case 1: User exists but not verified
  if (existingUser && existingUser.isVerified === false) {
    const lastSent = existingUser.lastVerificationEmailSentAt;
    const cooldownExpiresAt = new Date(
      lastSent?.getTime() +
        process.env.EMAIL_VERIFICATION_COOLDOWN_MINUTES * 60 * 1000
    );
    if (now < cooldownExpiresAt) {
      const waitTime = Math.ceil((cooldownExpiresAt - now) / 60000);
      return res
        .status(429)
        .json(
          new ApiResponse(
            429,
            { retryAfterMinutes: waitTime },
            `Please wait ${waitTime} more minute(s) before resending verification email.`
          )
        );
    }

    const verificationToken = existingUser.generateEmailVerificationToken();
    const url = `${process.env.FRONTEND_BASE_URL}/verify-email/${verificationToken}`;

    await sendMail(
      existingUser.email,
      "Verify your email",
      `<h2>Welcome to ERPro!</h2>
      <p>Please verify your email by clicking the link below:</p>.
      <a href="${url}">Verify Email</a>
      <p>This link will expire in 5 minutes.</p>`
    );
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          email: existingUser.email,
          redirectTo: "/resend-email",
        },
        "An account with this email already exists but hasn't been verified. Please check your inbox to verify your email."
      )
    );
  }
  // Case 3: New user signup
  const user = await User.create({
    name,
    email,
    password,
    lastVerificationEmailSentAt: now,
  });
  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userCreated) {
    throw new ApiError(
      500,
      "An unexpected error occurred during user signup. Please try again."
    );
  }

  const verificationToken = user.generateEmailVerificationToken();
  const url = `${process.env.FRONTEND_BASE_URL}/verify-email/${verificationToken}`;
  await sendMail(
    userCreated?.email,
    "Verify your email",
    `<h2>Welcome to ERPro!</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${url}">Verify Email</a>
      <p>This link will expire in 5 minutes.</p>`
  );
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { email: userCreated.email, redirectTo: "/resend-email" },
        "Please check your inbox to verify your email."
      )
    );
});

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const decode = jwt.verify(
      verificationToken,
      process.env.EMAIL_VERIFICATION_SECRET
    );
    const user = await User.findById(decode._id).select("-password");
    if (!user) {
      res.status(404).json(new ApiResponse(404, null, "User not found"));
    }
    if (user.isVerified) {
      res.status(409).json(new ApiResponse(409, null, "User already verified"));
    }

    if (user.refreshToken) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { redirectTo: "/" },
            "User logged in successfully."
          )
        );
    }
    user.isVerified = true;
    await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { email: user.email, redirectTo: "/login" },
          "Verified successfully."
        )
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            { redirectTo: "/resend-mail" },
            "Invalid or expired link."
          )
        );
    } else {
      throw new ApiError(500, "Something went wrong");
    }
  }
};

const resendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const now = Date.now();
  const lastSent = user.lastVerificationEmailSentAt;
  const cooldownExpiresAt = new Date(
    lastSent?.getTime() +
      process.env.EMAIL_VERIFICATION_COOLDOWN_MINUTES * 60 * 1000
  );
  if (now < cooldownExpiresAt) {
    const waitTime = Math.ceil((cooldownExpiresAt - now) / 60000);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          { retryAfterMinutes: waitTime },
          `Please wait ${waitTime} more minute(s) before resending verification email.`
        )
      );
  }
  const verificationToken = user.generateEmailVerificationToken();
  const url = `${process.env.FRONTEND_BASE_URL}/verify-email/${verificationToken}`;
  await sendMail(
    user.email,
    "Resend: Verify your email",
    `<h2>Welcome to ERPro!</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${url}">Verify Email</a>
      <p>This link will expire in 5 minutes.</p>`
  );
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Verification email resent."));
});

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          null,
          "Invalid email or User not exist .Please Signup."
        )
      );
  }
  const isCorrectPassword = await existUser.isPasswordCorrect(password);
  if (!isCorrectPassword) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Password Incorrect."));
  }

  if (!existUser.isVerified) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { redirectTo: "/resend-email", email: existUser.email },
          "Verified required"
        )
      );
  }
  const accessToken = await existUser.generateAccessToken();
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env,
    sameSite: "strict",
    maxAge: process.env.ACCESS_TOKEN_EXPIRY * 1000 * 60 * 60 * 24,
  });
  const refreshToken = await existUser.generateRefreshToken();
  existUser.refreshToken = refreshToken;
  await existUser.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, { redirectTo: "/" }, "User logged in successfully")
    );
});

export { handleSignup, verifyEmail, resendEmail, handleLogin };

//case 1:  if user is exist but not verified
//subcase 1: Then send email with 15min timer and redirect to varification
//subcase 2: Resend Token after 15 minute

//case 2: if user is exist and verified
//check for refreshToken token
//if refreshToken then redirect to Home
//if not refreshToken then redirect to Login

//Token
//if token expired then resend Token

//error
//when click on mail link then show msg token is Invalid or expire
