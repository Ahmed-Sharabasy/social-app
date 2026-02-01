// create routes for posts
import express from "express";
import * as postController from "../controllers/postController.js";
import { AuthValidator } from "../validators/authValidate.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// express-validator at all request data
const authValidator = new AuthValidator();

// after validator validateRequest middleware to get all errors (important)

const router = express.Router();

// route to get all posts

router.route("/").get(postController.getAllPosts);
router.route("/:id").get(postController.getPostById);

router
  .route("/")
  .post(
    authValidator.validatePostCreation(),
    validateRequest,
    postController.createPost,
  );

router
  .route("/toggle-like")
  .post(
    authValidator.validateToggleLike(),
    validateRequest,
    postController.toggleLikePost,
  );

router.route("/:id").delete(postController.deletePostById);

export default router;
