import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		location: String,
		description: String,
		picturePath: {
			type: String,
			default: "",
		},
		cloudinaryId: {
			type: String,
			require: true,
		},
		userPicturePath: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: false }],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
