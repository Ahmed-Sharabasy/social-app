import express from "express";

import * as authController from "../controllers/authController.js";
import { AuthValidator } from "../validators/authValidate.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// express-validator at all request data
const authValidator = new AuthValidator();

// after validator validateRequest middleware to get all errors (important)

const router = express.Router();

router
  .route("/sign-up")
  .post(authValidator.validateSignUp(), validateRequest, authController.signUp);

router.route("/sign-in").post(authController.signIn);
router
  .route("/reset-password")
  .post(
    authValidator.validateResetPassword(),
    validateRequest,
    authController.resetPassword,
  );

router.route("/get-otp").post(authController.getOtp);
router.route("/verify-otp").post(authController.verifyOtp);

export default router;
