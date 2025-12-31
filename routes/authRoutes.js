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

router.route("/get-otp").post(authController.getOtp);

export default router;
