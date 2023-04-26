import express from "express";
import { createComment, getPostComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET ALL COMMENTS FOR A POST
router.get("/:postId", verifyToken, getPostComments);

// CREATE A POST COMMENT
router.post("/:postId", verifyToken, createComment);

export default router;