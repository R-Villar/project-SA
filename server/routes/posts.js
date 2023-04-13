import express from "express";
import { getFeedPosts, getUserPosts, likePost, deletePost, updatedDescription } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/description", verifyToken, updatedDescription);

// DELETE
router.delete("/:postId", verifyToken, deletePost);

export default router;
