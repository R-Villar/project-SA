import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	user: null,
	token: null,
	posts: [],
  baseUrl: "https://project-sa.vercel.app",
  // baseUrl: "http://localhost:3001"
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("user friends non-existent.");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = updatedPosts;
		},
		setPostComment: (state, action) => {
			const comment = action.payload.find((data) => data.postId);
			const findPost = state.posts.find((post) => post._id === comment.postId);
			findPost.comments.push(comment);
		},
		removeComment: (state, action) => {
			state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					post.comments = post.comments.filter((comment) => comment._id !== action.payload._id);
				}
			});
		},
		updateCommentContent: (state, action) => {
			state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					post.comments.map((comment) => {
						if (comment._id === action.payload._id) {
							comment.content = action.payload.content;
						}
					});
				}
			});
		},
		updatePost: (state, action) => {
			state.posts.map((post) => {
				if (post._id === action.payload._id) {
					post.description = action.payload.description;
				}
			});
		},
		removePost: (state, action) => {
			const postId = action.payload;
			state.posts = state.posts.filter((post) => post._id !== postId);
		},
	},
});

export const {
	setMode,
	setLogin,
	setLogout,
	setFriends,
	setPosts,
	setPost,
	updatePost,
	removePost,
	setPostComment,
	removeComment,
	updateCommentContent,
} = authSlice.actions;
export default authSlice.reducer;
