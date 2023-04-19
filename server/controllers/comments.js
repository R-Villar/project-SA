import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// CREATE
export const createComment = async (req, res) => {
	try {
		const { userId, detail, postId, parentCommentId } = req.body;
		const post = await Post.findById(postId);

		const newComment = new Comment({
			parentCommentId,
			userId,
			postId,
			detail,
		});

		await newComment.save();
		await post.comments.push(newComment);

		post.save();
		const comment = await Comment.find();

		res.status(200).json(comment);
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: err.message });
	}
};

export const getPostComments = async (req, res) => {};
