import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { pink } from "@mui/material/colors";
import { IconButton, Typography, useTheme, Button, Box } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Friend } from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost, updatePost } from "@/state";
import ButtonGroup from "@mui/material/ButtonGroup";
import { UserReply } from "@/components/UserReply";
import { DisplayComments } from "@/scenes/comments/DisplayComments";
import { UserInputField } from "@/components/UserInputField";
import Skeleton from "@mui/material/Skeleton";

export const PostWidget = (props) => {
	const [isComments, setIsComments] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isReply, setIsReply] = useState(false);
	const [postToEdit, setPostToEdit] = useState(props.description);

	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const isLiked = Boolean(props.likes[loggedInUserId]);
	const likeCount = Object.keys(props.likes).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;

	const { _id } = useSelector((state) => state.user);
	const isUserPost = _id === props.postUserId;

	const patchLike = async () => {
		const response = await fetch(`http://localhost:3001/posts/${props.postId}/like`, {
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
		if (postToEdit !== props.description) {
			await fetch(`http://localhost:3001/posts/${props.postId}/description`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ description: postToEdit }),
			});

			dispatch(updatePost({ _id: props.postId, description: postToEdit }));
		}
	};

	const deletePost = async () => {
		fetch(`http://localhost:3001/posts/${props.postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		dispatch(removePost(props.postId));
	};

	return (
		<WidgetWrapper m='2rem 0'>
			{props.isLoading ? (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Skeleton animation='wave' variant='circular' width={60} height={60} />
					<Box sx={{ width: '70%', margin: 1 }}>
						<Skeleton animation='wave' variant='text' />
            <Skeleton animation='wave' variant='text' />
					</Box>
				</Box>
			) : (
				<Friend
					friendId={props.postUserId}
					name={props.name}
					subtitle={props.location}
					userPicturePath={props.userPicturePath}
				/>
			)}

			<FlexBetween mt='0.25rem'>
				{isEdit ? (
					<FlexBetween gap='1.5rem'>
						<UserInputField post={postToEdit} setPost={setPostToEdit} />
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

      {props.isLoading ? (
        <Skeleton animation='wave' variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
       ) : (
			props.picturePath && (
				<img
					width='100%'
					height='auto'
					alt='Post'
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={props.picturePath}
				/>
			)
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
						<Typography>{props.comments.length}</Typography>
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

			{isReply && <UserReply postId={props.postId} />}

			{isComments &&
				props.comments.map(
					({ _id, content, userPicturePath, firstName, lastName, postId, userId }) => (
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
					)
				)}
		</WidgetWrapper>
	);
};
