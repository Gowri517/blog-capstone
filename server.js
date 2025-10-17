import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/user.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));

