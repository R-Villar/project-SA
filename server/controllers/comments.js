import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// CREATE
export const createComment = async (req, res) => {
	try {
		const { userId, content, postId, parentCommentId, firstName, lastName, userPicturePath } = req.body;
		const post = await Post.findById(postId);

		const newComment = new Comment({
			parentCommentId,
			userId,
			postId,
			content,
			firstName,
			lastName,
			userPicturePath,
		});

		await newComment.save();
		await post.comments.push(newComment);

		post.save();
		const comment = await Comment.find(newComment);

		res.status(200).json(comment);
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: err.message });
	}
};

export const getPostComments = async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.postId });

		const comments = await Promise.all(post.comments.map((id) => Comment.findById(id)));

		res.status(200).json(comments);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const updateContent = async (req, res) => {
	try {
		const { commentId } = req.params;
		const updatedComment = await Comment.findByIdAndUpdate(commentId, { content: req.body.content });
		res.status(200).json(updatedComment);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
