import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/apiResponse.js";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(
        new ApiResponse(422, { errors: errors.array() }, "Validation failed")
      );
  }
  next();
};

export { validator };
