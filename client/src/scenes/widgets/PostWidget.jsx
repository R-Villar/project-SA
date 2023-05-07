import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { pink } from "@mui/material/colors";
import { Box, Divider, IconButton, Typography, useTheme, Button, InputBase } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Friend } from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost, updatePost } from "@/state";
import ButtonGroup from "@mui/material/ButtonGroup";
import { UserReply } from "@/components/UserReply";
import UserImage from "@/components/UserImage";
import { DisplayComments } from "@/scenes/comments/DisplayComments";

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
	const [isEdit, setIsEdit] = useState(false);
	const [isReply, setIsReply] = useState(false);
	const [postToEdit, setPostToEdit] = useState(description);

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

	const patchDescription = async () => {
        if (postToEdit !== description) {
            await fetch(`http://localhost:3001/posts/${postId}/description`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ description: postToEdit }),
		});

		dispatch(updatePost({ _id: postId, description: postToEdit }));

        }
		
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

	return (
		<WidgetWrapper m='2rem 0'>
			<Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />

			<FlexBetween mt='0.25rem'>
				{isEdit ? (
					<FlexBetween gap='1.5rem'>
						<InputBase
							value={postToEdit}
							onChange={(e) => setPostToEdit(e.target.value)}
							sx={{
								width: "100%",
								backgroundColor: palette.neutral.light,
								borderRadius: "2rem",
								padding: "0.5rem 2rem",
							}}
						/>
					</FlexBetween>
				) : (
					<Typography color={main} sx={{ mt: "1rem" }}>
						{postToEdit}
					</Typography>
				)}

				{isUserPost && (
					<FlexBetween>
						<FlexBetween gap='0.3rem'>
							<ButtonGroup onClick={() => setIsEdit(!isEdit)}>
								{!isEdit ? (
									<Button endIcon={<EditOutlinedIcon />}>Edit</Button>
								) : (
									<Button onClick={patchDescription} endIcon={<DoneOutlinedIcon />}>
										Done
									</Button>
								)}
							</ButtonGroup>
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
					src={picturePath}
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

					<FlexBetween gap='0.3rem'>
						<IconButton onClick={() => setIsReply(!isReply)} aria-label='Reply'>
							<ReplyOutlinedIcon />
						</IconButton>
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

			{isReply && <UserReply postId={postId} />}

			{isComments &&
				comments.map(({ _id, content, userPicturePath, firstName, lastName, postId, userId }) => (
					<DisplayComments
						key={_id}
						_id={_id}
						content={content}
						userPicturePath={userPicturePath}
						firstName={firstName}
						lastName={lastName}
						postId={postId}
						userId={userId}
					/>
				))}
		</WidgetWrapper>
	);
};
