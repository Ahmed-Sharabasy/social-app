import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log("db is connected suc");
});

app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log(`Server Is Running on port ${3000}`);
});
