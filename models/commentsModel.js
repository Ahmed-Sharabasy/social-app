import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // todo: remove all validation from here and handle it in express validator
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Comment must belong to a post"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [1, "Comment cannot be empty"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        likedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    // Ensure virtuals are included in JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for like count
commentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Index for better query performance
// commentSchema.index({ postId: 1, createdAt: -1 });
// commentSchema.index({ userId: 1 });
// commentSchema.index({ "likes.userId": 1 });

export default mongoose.model("Comment", commentSchema);
