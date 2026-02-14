//? Here we are setting up a Socket.IO server that will allow real-time communication between the server and connected clients. The `initializeSocket` function takes the HTTP server as an argument and initializes the Socket.IO server on top of it. When a client connects, it logs the connection with the client's socket ID. You can expand this function to handle various events and messages as needed for your application.

import { Server } from "socket.io";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins (you can specify your frontend URL here)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
  });
}
