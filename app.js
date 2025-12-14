import express from "express";
// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/users", userController);

export default app;