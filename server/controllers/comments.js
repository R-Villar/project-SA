import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// CREATE
export const createComment = async (req, res) => {
	try {
        const { userId, detail, postId, parentCommentId } = req.body;
		const user = await User.findById(userId);

		// // // Create a new comment instance with the post ID and text
		const comment = new Comment({
            parentCommentId,
            userId,
			postId,
			detail,
		});

		// // Save the comment to the database
		await comment.save();

		// Return the new comment as JSON
		res.status(201).json(comment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

export const getPostComments = async (req, res) => {}
