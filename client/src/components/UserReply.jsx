import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostComment } from "@/state";
import { UserInputField } from "./UserInputField";
import { useSnackbar } from "notistack";

export const UserReply = ({ postId }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const { _id, firstName, lastName, picturePath } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const { enqueueSnackbar } = useSnackbar();

	const handleComment = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("postId", postId);
		formData.append("content", comment);
		formData.append("userId", _id);
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("userPicturePath", picturePath);

		const commentData = Object.fromEntries(formData);
		const response = await fetch(`http://localhost:3001/comments/${postId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentData),
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(setPostComment(data));
			setComment("");
			enqueueSnackbar("Comment posted", { variant: "info" });
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	return (
		<Box component='form'  onSubmit={handleComment} justifyContent='center' display='flex' mt='0.5rem'>
			<UserInputField setPost={setComment} post={comment} />
			<Button type='submit'>reply</Button>
		</Box>
	);
};
