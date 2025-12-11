// routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";
// import { authController } from "../controllers/authController.js";

const router = express.Router();
router.route("/sign-up").post(authController.signUp);

export default router;
