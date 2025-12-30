import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "./commonValidators.js";

export const signupValidator = [
  nameValidator("name"),
  emailValidator,
  passwordValidator,
];

export const loginValidator = [emailValidator, passwordValidator];
