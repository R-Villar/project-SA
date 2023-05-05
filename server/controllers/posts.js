import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import cloudinary from "../middleware/cloudinary.js";

// CREATE
export const createPost = async (req, res) => {
	try {
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "users_posts",
			});

			const { userId, description } = req.body;
			const user = await User.findById(userId);
			const newPost = new Post({
				userId,
				firstName: user.firstName,
				lastName: user.lastName,
				location: user.location,
				description,
				userPicturePath: user.picturePath,
				picturePath: result.secure_url,
                cloudinaryId: result.public_id,
				likes: {},
				comments: [],
			});
			await newPost.save();

			const post = await Post.find();
			res.status(201).json(post);
		} else {
			const { userId, description } = req.body;
			const user = await User.findById(userId);
			const newPost = new Post({
				userId,
				firstName: user.firstName,
				lastName: user.lastName,
				location: user.location,
				description,
				userPicturePath: user.picturePath,
				picturePath: "",
				likes: {},
				comments: [],
			});
			await newPost.save();

			const post = await Post.find();
			res.status(201).json(post);
		}
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

// READ
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find().populate("comments");

		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// GET SINGLE POST
export const getPost = async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.postId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// DELETE
export const deletePost = async (req, res) => {
	try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        await cloudinary.uploader.destroy(post.cloudinaryId);
        await Comment.deleteMany({_id: {$in: post.comments}})

		res.status(200).json();
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// UPDATE
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const updatedDescription = async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const post = await Post.findById(id);

		const updatedDescription = await Post.findByIdAndUpdate(post._id, { description: description });

		res.status(200).json(updatedDescription);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
