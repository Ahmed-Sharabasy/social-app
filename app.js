import express from "express";
// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
// app.use("/api/users", userController);

app.use(globalErrorHandler);

export default app;
