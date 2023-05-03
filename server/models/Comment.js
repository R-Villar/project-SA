import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
	{
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		parentCommentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
			required: false, // if not populated, then its a top level comment
		},
		content: {
			type: String,
			required: true,
		},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
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
        userPicturePath: String,
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
