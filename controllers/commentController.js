import Comment from "../models/commentsModel.js";
import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";
import AppError from "../utils/AppError.js";

// todo checkout by your self the code is correct
// Get all comments for a given post ID
export const getAllComments = async (req, res, next) => {
  const { postId } = req.body;

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  // Get all non-deleted comments for the post
  const comments = await Comment.find({
    postId: postId,
    isDeleted: false,
  });
  // .populate("userId", "username avatar")
  // .sort({ createdAt: -1 });

  res.status(200).json({
    data: { comments },
    status: "success",
  });
};

// Create a new comment on a post
export const createComment = async (req, res, next) => {
  const { postId, userId, content } = req.body;

  // // Validate required fields
  // if (!postId || !userId || !content) {
  //   return next(
  //     new AppError("Post ID, User ID, and content are required", 400),
  //   );
  // }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found , you must be logged in", 404));
  }

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  // Create new comment
  const newComment = await Comment.create({
    userId,
    postId,
    content,
  });

  // // Populate user information before sending response
  // await newComment.populate("userId", "username avatar");

  res.status(201).json({
    data: { comment: newComment },
    status: "success",
  });
};

// Toggle like on a comment (like or unlike)
export const toggleLikeComment = async (req, res, next) => {
  try {
    const { commentId, userId } = req.body;

    // Validate required fields
    if (!commentId || !userId) {
      return next(new AppError("Comment ID and User ID are required", 400));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    // Check if comment is deleted
    if (comment.isDeleted) {
      return next(new AppError("Cannot like a deleted comment", 400));
    }

    // Check if user already liked the comment
    const existingLikeIndex = comment.likes.findIndex(
      (like) => like.userId.toString() === userId,
    );

    if (existingLikeIndex !== -1) {
      // Remove like if it exists
      comment.likes.splice(existingLikeIndex, 1);
    } else {
      // Add like if it doesn't exist
      comment.likes.push({ userId });
    }

    await comment.save();

    res.status(200).json({
      data: {
        message: existingLikeIndex !== -1 ? "Unlike" : "Liked",
        likeCount: comment.likes.length,
      },
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a comment by ID (only the owner can delete)
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    // Validate required fields
    if (!commentId || !userId) {
      return next(new AppError("Comment ID and User ID are required", 400));
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    // Check if comment is already deleted
    if (comment.isDeleted) {
      return next(new AppError("Comment is already deleted", 400));
    }

    // Check if user is the owner of the comment
    if (comment.userId.toString() !== userId) {
      return next(
        new AppError("You are not authorized to delete this comment", 403),
      );
    }

    // Soft delete the comment by setting isDeleted to true
    comment.isDeleted = true;
    await comment.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
