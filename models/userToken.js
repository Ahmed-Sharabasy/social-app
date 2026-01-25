//TODO create a token model to store user tokens with expiry
// use for save all user token , after signout remove all user tokens from db
//! not finshed yet

import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserToken", userTokenSchema);
