// blog-backend/routes/user.js
import express from "express";
import User from "../models/User.js"; // ✅ correct relative path

const router = express.Router();

// GET all users (for testing / check existing emails)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // only return name & email
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

