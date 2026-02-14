//todo

import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    // All users ids saved in participants array, the first user is the creator of the chat room
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Chat room must have participants"],
      },
    ],

    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// save the creator of the chat room as the first participant

export default mongoose.model("ChatRoom", chatRoomSchema);
