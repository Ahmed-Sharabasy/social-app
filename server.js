import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";

import { initializeSocket } from "./socket/index.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then((con) => {
  console.log("db is connected suc");
});

// create socketIO server and initialize it on the same server as Express if needed
const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server + SocketIO server Is Running on port ${PORT}`);
});

// app.listen(3000, () => {
//   console.log(`Server Is Running on port ${3000}`);
// });
