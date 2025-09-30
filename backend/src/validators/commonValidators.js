import { body } from "express-validator";

export const nameValidator = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required.")
  .isLength({ min: 2 })
  .withMessage("Name must be at least 2 characters.");

export const emailValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Please enter a valid email address.");

export const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters.")
  .bail()
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter.")
  .bail()
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter.")
  .bail()
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number.")
  .bail()
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("Password must contain at least one special character.")
  .bail();
