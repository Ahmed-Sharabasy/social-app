import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import follows from "./routes/followsRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/follows", follows);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/chat", chatRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
