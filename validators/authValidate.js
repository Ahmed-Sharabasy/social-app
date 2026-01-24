// const { body } = require("express-validator");
import { body } from "express-validator";

export class AuthValidator {
  validateSignUp() {
    return [
      body("name").trim().notEmpty().withMessage("Name is required"),

      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

      body("bio").optional().notEmpty().withMessage("Bio is required"),
    ];
  }

  validateResetPassword() {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("New Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    ];
  }
}
