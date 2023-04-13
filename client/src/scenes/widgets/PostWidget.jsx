import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { pink } from "@mui/material/colors";
import { Box, Divider, IconButton, Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Friend } from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost } from "@/state";

export const PostWidget = ({
	postId,
	name,
	postUserId,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;

	const { _id } = useSelector((state) => state.user);
	const isUserPost = _id === postUserId;

	const patchLike = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	const deletePost = async () => {
		fetch(`http://localhost:3001/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		dispatch(removePost(postId));
	};

    const editPost = () => {
        console.log({description})
    }

	return (
		<WidgetWrapper m='2rem 0'>
			<Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />

			<FlexBetween mt='0.25rem'>
				<Typography color={main} sx={{ mt: "1rem" }}>
					{description}
				</Typography>
				{isUserPost && (
					<FlexBetween>
						<FlexBetween gap='0.3rem'>
							<EditOutlinedIcon onClick={editPost} sx={{ color: primary }} />
						</FlexBetween>
					</FlexBetween>
				)}
			</FlexBetween>

			{picturePath && (
				<img
					width='100%'
					height='auto'
					alt='Post'
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={`http://localhost:3001/assets/${picturePath}`}
				/>
			)}
			<FlexBetween mt='0.25rem'>
				<FlexBetween mt='1rem'>
					<FlexBetween gap='0.3rem'>
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: pink[500] }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>

					<FlexBetween gap='0.3rem'>
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>

				{isUserPost && (
					<FlexBetween mt='0.25rem'>
						<FlexBetween mt='1rem'>
							<FlexBetween gap='0.3rem'>
								<Button color='warning' onClick={deletePost} endIcon={<DeleteOutlinedIcon />}>
									delete
								</Button>
							</FlexBetween>
						</FlexBetween>
					</FlexBetween>
				)}
			</FlexBetween>

			{isComments && (
				<Box mt='0.5rem'>
					{comments.map((comment, i) => (
						<Box key={`${name}-${i}`}>
							<Divider />
							<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>{comment}</Typography>
						</Box>
					))}
					<Divider />
				</Box>
			)}
		</WidgetWrapper>
	);
};
