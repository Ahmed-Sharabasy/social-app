import express from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import * as followController from "../controllers/followController.js";
const router = express.Router();

router.route("/follow-request").post(followController.followRequest);

export default router;
