import express from "express";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";

const router = express.Router();

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Public route – Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "name");
  res.json(posts);
});

// Add post
router.post("/", verifyToken, async (req, res) => {
  const post = new Post({ ...req.body, author: req.user.userId });
  await post.save();
  res.json({ message: "Post created", post });
});

// Edit post
router.put("/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.userId)
    return res.status(403).json({ error: "Unauthorized" });

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete post
router.delete("/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.userId)
    return res.status(403).json({ error: "Unauthorized" });

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

export default router;
