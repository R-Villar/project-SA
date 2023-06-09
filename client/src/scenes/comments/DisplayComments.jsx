import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Divider, IconButton, Typography, useTheme, Button, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, updateCommentContent } from "@/state";
import FlexBetween from "@/components/FlexBetween";
import UserImage from "@/components/UserImage";
import { StyledMenu } from "@/components/StyledMenu";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DisplayComments = ({ _id, content, userPicturePath, firstName, lastName, postId, userId }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const [openMenu, setOpenMenu] = useState(null);
	const [editContent, setEditContent] = useState(content);
	const [isEdit, setIsEdit] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const isUserComment = loggedInUserId === userId;

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const open = Boolean(openMenu);

	const handleClick = (event) => {
		setOpenMenu(event.currentTarget);
	};
	const handleClose = () => {
		setOpenMenu(null);
	};

	const deleteComment = async () => {
		const response = await fetch(`http://localhost:3001/comments/${postId}/${_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			enqueueSnackbar(data, { variant: "info" });
			dispatch(removeComment({ _id, postId }));
			handleClose();
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	const patchContent = async () => {
		if (editContent !== content) {
			const response = await fetch(`http://localhost:3001/comments/${_id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: editContent }),
			});
			if (response.ok) {
				enqueueSnackbar("Comment updated", { variant: "info" });
				dispatch(updateCommentContent({ _id, postId, content: editContent }));
			} else {
				const error = await response.json();
				enqueueSnackbar(error.message, { variant: "error" });
			}
		}

		setIsEdit(!isEdit);
	};

	return (
		<Box mt='0.5rem' key={`${_id}`}>
			<Divider sx={{ my: 0.5 }} />
			<FlexBetween gap='0.5rem' pb='1.1rem'>
				<Box display='flex' gap='0.5rem'>
					<UserImage image={userPicturePath} size='35px' />
					<Box mt='0.3rem'>
						<Typography variant='h6'>
							{firstName} {lastName}
						</Typography>
					</Box>
				</Box>
				{isUserComment && (
					<Box>
						<IconButton variant='contained' onClick={handleClick}>
							<MoreHorizOutlinedIcon />
						</IconButton>
						<StyledMenu anchorEl={openMenu} open={open} onClose={handleClose}>
							<MenuItem
								onClick={() => {
									setIsEdit(!isEdit), handleClose();
								}}
								disableRipple
							>
								<EditOutlinedIcon />
								Edit
							</MenuItem>
							<MenuItem onClick={() => setOpenConfirm(true)} disableRipple>
								<DeleteOutlinedIcon />
								Delete
							</MenuItem>
						</StyledMenu>
					</Box>
				)}
			</FlexBetween>
			<FlexBetween mt='0.25rem'>
				{isEdit ? (
					<FlexBetween gap='1.5rem'>
						<InputBase
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
							sx={{
								width: "100%",
								backgroundColor: palette.neutral.light,
								borderRadius: "2rem",
								padding: "0.5rem 2rem",
							}}
						/>
						<Button onClick={patchContent} endIcon={<DoneOutlinedIcon />}>
							Done
						</Button>
					</FlexBetween>
				) : (
					<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>{editContent}</Typography>
				)}
			</FlexBetween>

			<Dialog
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{"Delete Comment?"}</DialogTitle>
				<DialogContent id='alert-dialog-content'>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this comment? this action can not be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenConfirm(false), handleClose();
						}}
					>
						Cancel
					</Button>
					<Button onClick={deleteComment} autoFocus>
						delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
