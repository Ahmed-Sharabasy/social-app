import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
    content: String, // validation on express validator

    // next version add image to post
    // image: {
    //   type: String,
    //   default: null,
    // },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    shares: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Virtual for like count
postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Ensure virtuals are included in JSON
postSchema.set("toJSON", { virtuals: true });

// Index for better query performance
postSchema.index({ userId: 1 });
postSchema.index({ "likes.userId": 1 });

// Middleware to populate comments when finding posts
// postSchema.pre(/^find/, function () {
//   this.populate({
//     path: "comments",
//     match: { isDeleted: false },
//     select: "-__v",
//   });
// });

export default mongoose.model("Post", postSchema);
