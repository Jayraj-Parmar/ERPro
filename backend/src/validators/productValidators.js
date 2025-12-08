import { body } from "express-validator";
import { nameValidator } from "./commonValidators.js";

const reorderValidator = body("reorder_level")
  .trim()
  .notEmpty()
  .withMessage("Reorder level is required.");

export const productValidator = [nameValidator, reorderValidator];
