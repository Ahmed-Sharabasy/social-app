import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import follows from "./routes/followsRoutes.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/follows", follows);
app.use("/api/v1/users", userRoutes);

app.use(globalErrorHandler);

export default app;
