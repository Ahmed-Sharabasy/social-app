// routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";
// import { authController } from "../controllers/authController.js";
import { AuthValidator } from "../validators/authValidate.js";

const authValidator = new AuthValidator();

const router = express.Router();
router
  .route("/sign-up")
  .post(authValidator.validateSignUp(), authController.signUp);

export default router;
