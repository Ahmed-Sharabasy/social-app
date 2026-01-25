import mongoose from "mongoose";

const followersSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["following", "blocked"],
      default: "following",
    },
  },
  { timestamps: true },
);

const Follows = mongoose.model("Followers", followersSchema);

export default Follows;
