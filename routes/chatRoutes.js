//todo

import express from "express";
import {
  createRoom,
  // getUserRooms,
  // getRoomMessages,
} from "../controllers/chatRoomController.js";

// import protect from "../middlewares/auth.js";

const router = express.Router();

router.route("/chat-rooms/new").post(createRoom);
// router.get("/chat-rooms", protect, getUserRooms);
// router.get("/chat-messages/:roomId", protect, getRoomMessages);

export default router;
