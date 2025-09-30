import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getUserData = asyncHandler(async (req, res) => {
  //User does not exist.-Done
  if (!req.user) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, null, "Invalid email or User does not exist.")
      );
  }
  return res.status(200).json(
    new ApiResponse(200, {
      user: req.user,
    })
  );
});
