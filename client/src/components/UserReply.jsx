import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Box, Divider, IconButton, Typography, useTheme, Button, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostComment } from "@/state";

export const UserReply = ({ postId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const [comment, setComment] = useState("");
	const { _id, firstName, lastName, picturePath } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);

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
		const data = await response.json();
		dispatch(setPostComment(data));
		setComment("");
	};

	return (
		<Box component='form' onSubmit={handleComment} justifyContent='center' display='flex' mt='0.5rem'>
			<InputBase
				placeholder='Add a comment'
				onChange={(e) => setComment(e.target.value)}
				value={comment}
				sx={{
					width: "80%",
					backgroundColor: palette.neutral.light,
					borderRadius: "2rem",
					padding: "0.5rem 2rem",
				}}
			/>
			<Button type='submit'>reply</Button>
		</Box>
	);
};
