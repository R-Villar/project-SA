import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { pink } from "@mui/material/colors";
import { IconButton, Typography, useTheme, Button, Box } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Friend } from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost, updatePost } from "@/state";
import { UserReply } from "@/components/UserReply";
import { DisplayComments } from "@/scenes/comments/DisplayComments";
import { UserInputField } from "@/components/UserInputField";
import Skeleton from "@mui/material/Skeleton";
import { StyledMenu } from "@/components/StyledMenu";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const PostWidget = ({
	isLoading,
	postId,
	postUserId,
	name,
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
	const [openMenu, setOpenMenu] = useState(null);
	const [postToEdit, setPostToEdit] = useState(description);
	const [openConfirm, setOpenConfirm] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;

	const { _id } = useSelector((state) => state.user);
	const isUserPost = _id === postUserId;

	const open = Boolean(openMenu);

	const handleClick = (event) => {
		setOpenMenu(event.currentTarget);
	};
	const handleClose = () => {
		setOpenMenu(null);
	};

	const patchLike = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		if (response.ok) {
			const updatedPost = await response.json();
			dispatch(setPost({ post: updatedPost }));
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	const patchDescription = async () => {
		if (postToEdit !== description) {
			const response = await fetch(`${import.meta.env.VITE_BASEURL}/posts/${postId}/description`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ description: postToEdit }),
			});
			if (response.ok) {
				dispatch(updatePost({ _id: postId, description: postToEdit }));
			} else {
				const error = await response.json();
				enqueueSnackbar(error.message, { variant: "error" });
			}
		}
		setIsEdit(!isEdit);
	};

	const deletePost = async () => {
		const response = await fetch(`${import.meta.env.VITE_BASEURL}/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const deletedPost = await response.json();
			enqueueSnackbar(deletedPost, { variant: "success" });
			dispatch(removePost(postId));
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	return (
		<WidgetWrapper m='2rem 0'>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				{isLoading ? (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Skeleton animation='wave' variant='circular' width={60} height={60} />
						<Box sx={{ width: "70%", margin: 1 }}>
							<Skeleton animation='wave' variant='text' />
							<Skeleton animation='wave' variant='text' />
						</Box>
					</Box>
				) : (
					<Friend
						friendId={postUserId}
						name={name}
						subtitle={location}
						userPicturePath={userPicturePath}
					/>
				)}

				{isUserPost && (
					<Box>
						<IconButton aria-label='more options' variant='contained' onClick={handleClick}>
							<MoreHorizOutlinedIcon />
						</IconButton>
						<StyledMenu anchorEl={openMenu} open={open} onClose={handleClose}>
							<MenuItem
								aria-label='edit'
								onClick={() => {
									setIsEdit(!isEdit), handleClose();
								}}
								disableRipple
							>
								<EditOutlinedIcon />
								Edit
							</MenuItem>
							<MenuItem aria-label='delete' onClick={() => setOpenConfirm(true)}>
								<DeleteOutlinedIcon />
								delete
							</MenuItem>
						</StyledMenu>
					</Box>
				)}
			</Box>

			<FlexBetween mt='0.25rem'>
				{isEdit ? (
					<>
						<FlexBetween gap='1.5rem'>
							<UserInputField post={postToEdit} setPost={setPostToEdit} />
						</FlexBetween>
						<Button aria-label='done' onClick={patchDescription} endIcon={<DoneOutlinedIcon />}>
							Done
						</Button>
					</>
				) : (
					<Typography color={main} sx={{ mt: "1rem" }}>
						{postToEdit}
					</Typography>
				)}
			</FlexBetween>

			<Dialog
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{"Delete Post?"}</DialogTitle>
				<DialogContent id='alert-dialog-content'>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this Post and all it's comments? this action can not
						be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						aria-label='cancel'
						onClick={() => {
							setOpenConfirm(false), handleClose();
						}}
					>
						Cancel
					</Button>
					<Button aria-label='delete' onClick={deletePost} autoFocus>
						delete
					</Button>
				</DialogActions>
			</Dialog>

			{isLoading ? (
				<Skeleton animation='wave' variant='rectangular' width='100%'>
					<div style={{ paddingTop: "57%" }} />
				</Skeleton>
			) : (
				picturePath && (
					<img
						width='100%'
						height='auto'
						alt='Post'
						style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
						src={picturePath}
					/>
				)
			)}

			<FlexBetween mt='0.25rem'>
				<FlexBetween mt='1rem'>
					<FlexBetween gap='0.3rem'>
						<IconButton aria-label='like / unlike' onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: pink[500] }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>

					<FlexBetween gap='0.3rem'>
						<IconButton aria-label='comment' onClick={() => setIsComments(!isComments)}>
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
