//? Here we are setting up a Socket.IO server that will allow real-time communication between the server and connected clients. The `initializeSocket` function takes the HTTP server as an argument and initializes the Socket.IO server on top of it. When a client connects, it logs the connection with the client's socket ID. You can expand this function to handle various events and messages as needed for your application.

import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import ChatRoom from "../models/chatRoomsModel.js";
import * as chatRoomController from "../controllers/chatRoomController.js";

import { Server } from "socket.io";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins (you can specify your frontend URL here)
      methods: ["GET", "POST"],
    },
  });

  // Middleware to authenticate socket connections using JWT
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.headers.token || socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Unauthorized: No token provided"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        _id: decoded.id,
        // isVerified: true,
      });
      if (!user) {
        return next(new Error("Unauthorized: User not found or not verivied "));
      }
      // Attach user information to the socket object
      socket.userId = user._id;

      next();
    } catch (err) {
      console.log(err);
      return next(new Error("invalied authentication progress"));
    }
  });

  io.on("connection", (socket) => {
    try {
      console.log(
        `{from connection} A user connected: ${socket.userId} with socket ID: ${socket.id}`,
      );
      // get or create a chat room between the two users and join the socket to that room
      socket.on("joinChatRoom", async ({ participantId }) => {
        // ckeck if the chat room already exists between the two users
        // if it exists, join the socket to that room, if not create a new chat room and join the socket to that room
        const room = await chatRoomController.findOrCreateChatRoom(
          socket.userId,
          participantId,
        );
        if (room) {
          socket.join(room._id.toString());
          console.log(room);
          console.log(
            `User ${socket.userId} joined existing chat room: ${room._id}`,
          );
        }

        io.to(socket.id).emit("chatData", {
          roomId: room ? room._id : null,
          message: "Joined  chat room successfully",
        });
      });
    } catch (error) {
      console.error("Error during socket connection:", error);
      io.to(socket.id).emit("error", {
        message: "An error occurred during socket connection",
      });
    }

    //todo send message to a specific chat room

    // leaveChatRoom
    socket.on("leaveChatRoom", (roomId) => {
      socket.leave(roomId);
      socket.emit("leaveChatRoomSuccess", {
        message: "Left chat room successfully",
      });
      console.log(`User ${socket.userId} left chat room: ${roomId}`);
    });

    // Handle disconnection
    io.on("disconnect", () => {
      console.log("A user disconnected: " + socket.id);
    });
  });
}
