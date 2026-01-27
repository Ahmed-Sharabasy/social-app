import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

// Example route for user profile picture upload
// router.patch("/updateMe", upload.single("photo"), userController.updateMe);
router
  .route("/updateMe")
  .patch(userController.uploadUserAvatar, userController.updateMe);

export default router;
