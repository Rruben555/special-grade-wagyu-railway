import express from "express";
import db from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const { Post, User, Comment } = db;

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["user_id", "username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["user_id", "username"] }]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(posts);
  } catch (err) {
    console.error("GET /posts error:", err);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

// Create Post
router.post("/", protect, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      user_id: req.user.user_id 
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // memastikan hanya pemilik yang bisa hapus
    if (post.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Not allowed: Not your post" });
    }

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET single post
router.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    if (isNaN(postId)) return res.status(400).json({ message: "Invalid Post ID" });

    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ["user_id", "username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["user_id", "username"] }]
        }
      ]
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("GET /posts/:postId error:", err);
    res.status(500).json({ message: "Failed to get post" });
  }
});

// POST comment
router.post("/:postId", protect, async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    if (isNaN(postId)) return res.status(400).json({ message: "Invalid Post ID" });

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment content required" });

    const comment = await Comment.create({
      content,
      post_id: post.post_id,
      user_id: req.user.user_id
    });

    const includeUser = await Comment.findByPk(comment.comment_id, {
      include: [{ model: User, attributes: ["user_id", "username"] }]
    });

    res.json(includeUser);
  } catch (err) {
    console.error("POST /posts/:id/comments error:", err);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

export default router;
