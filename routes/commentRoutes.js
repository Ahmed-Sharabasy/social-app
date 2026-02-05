// create routes for comments
import express from "express";
import * as commentController from "../controllers/commentController.js";
import { AuthValidator } from "../validators/authValidate.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// express-validator for all request data
const authValidator = new AuthValidator();

// after validator validateRequest middleware to get all errors (important)

const router = express.Router();

// route to get all comments for a post
router
  .route("/")
  .get(
    authValidator.validateGetComments(),
    validateRequest,
    commentController.getAllComments,
  );

// route to create a new comment
router
  .route("/new")
  .post(
    authValidator.validateCommentCreationOnPost(),
    validateRequest,
    commentController.createComment,
  );

// todo check this routes with its controller functions
// // route to toggle like on a comment
// router.route("/toggle-like").post(
//   // authValidator.validateToggleLikeComment(),
//   // validateRequest,
//   commentController.toggleLikeComment,
// );

// // route to delete a comment
// router.route("/:commentId").delete(commentController.deleteComment);

export default router;
