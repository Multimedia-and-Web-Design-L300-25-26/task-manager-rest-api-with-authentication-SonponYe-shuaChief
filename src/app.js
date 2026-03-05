import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

globalThis.mongoose = mongoose;

const dbReadyPromise = connectDB().catch((error) => {
	if (process.env.NODE_ENV !== "test") {
		console.error("Database connection failed:", error.message);
		process.exit(1);
	}
});

app.use(express.json());

app.use(async (req, res, next) => {
	try {
		await dbReadyPromise;
		next();
	} catch (error) {
		res.status(500).json({ message: "Database not ready" });
	}
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;

