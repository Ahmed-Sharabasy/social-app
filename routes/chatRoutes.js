//todo

import express from "express";
import {
  createRoom,
  getUserChatRooms,
  // getRoomMessages,
} from "../controllers/chatRoomController.js";

// import protect from "../middlewares/auth.js";

const router = express.Router();

router.route("/chat-rooms/new").post(createRoom);
router.get("/chat-rooms", getUserChatRooms);
// router.get("/chat-messages/:roomId", protect, getRoomMessages);

export default router;
