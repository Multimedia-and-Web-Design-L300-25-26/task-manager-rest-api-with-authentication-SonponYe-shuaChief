import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config(); // This loads your .env variables

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;




const connectDB = async () => {
  try {
    // We pull the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // Stop the app if the database isn't working
  }
};

connectDB();

