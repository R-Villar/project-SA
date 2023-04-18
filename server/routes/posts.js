import express from "express";
import {
	getFeedPosts,
	getUserPosts,
	getPost,
	likePost,
	deletePost,
	updatedDescription,
} from "../controllers/posts.js";
import { createComment, getPostComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:postId", verifyToken, getPost);
router.get("/userPost/:userId", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/description", verifyToken, updatedDescription);

// DELETE
router.delete("/:postId", verifyToken, deletePost);

// CREATE A POST COMMENT
router.post("/:postId/comment", verifyToken, createComment);

// GET ALL COMMENTS FOR A POST
router.get("/:postId/comments", verifyToken, getPostComments);

export default router;
