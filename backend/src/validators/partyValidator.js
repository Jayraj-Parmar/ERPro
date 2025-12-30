import { body } from "express-validator";
import {
  contactNumberValidator,
  emailValidator,
  nameValidator,
  whatsappNumberValidator,
} from "./commonValidators.js";

const gstValidator = body("gst_number")
  .optional({ checkFalsy: true })
  .isUppercase()
  .withMessage("GSTIN must be in uppercase")
  .bail()
  .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
  .withMessage("Enter a valid GSTIN")
  .bail();

export const partyValidator = [
  nameValidator("first_name"),
  contactNumberValidator("contact_number"),
  whatsappNumberValidator("whatsapp_number"),
  emailValidator,
  gstValidator,
];
