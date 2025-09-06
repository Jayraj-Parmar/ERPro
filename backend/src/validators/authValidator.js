import { body } from "express-validator";

const signupValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must include uppercase, lowercase, number, and special character."
    )
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .notEmpty()
    .withMessage("Password is required."),
];

export { signupValidator };
