// const { body } = require("express-validator");
import { body } from "express-validator";

export class AuthValidator {
  // Sign up
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

  // Reset Password
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

  // POST
  validatePostCreation() {
    return [
      body("content")
        .trim()
        .notEmpty()
        .withMessage("Post content is required")
        .isLength({ max: 5000 })
        .withMessage("Post content cannot exceed 5000 characters"),
      body("image").optional(),
    ];
  }
  // validate toggleLike
  validateToggleLike() {
    return [
      body("postId")
        .trim()
        .notEmpty()
        .withMessage("Post ID is required")
        .isMongoId()
        .withMessage("Invalid Post ID"),
      body("userId")
        .trim()
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid User ID"),
    ];
  }
}
