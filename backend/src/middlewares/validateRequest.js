import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(new ApiError(422, "Validation failed", errors.array()));
  }
  next();
};

export { validator };
