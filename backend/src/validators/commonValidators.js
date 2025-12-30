import { body } from "express-validator";

export const nameValidator = (fieldName) =>
  body(fieldName)
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 characters.")
    .bail();

export const emailValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required.")
  .bail()
  .isEmail()
  .withMessage("Please enter a valid email address.")
  .bail();

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

export const contactNumberValidator = (fieldName) =>
  body(fieldName)
    .notEmpty()
    .withMessage("Conatact number is required.")
    .bail()
    .isNumeric()
    .withMessage("Conatact number must contain only digits")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Conatact number must be exactly 10 digits")
    .bail()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid Indian Conatact number")
    .bail();

export const whatsappNumberValidator = (fieldName) =>
  body(fieldName)
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Whatsapp number must contain only digits")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Whatsapp number must be exactly 10 digits")
    .bail()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid Indian Whatsapp number")
    .bail();
