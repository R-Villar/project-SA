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


export const DisplayComments = ({ _id, content, userPicturePath, firstName, lastName, postId, userId }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const [openMenu, setOpenMenu] = useState(null);
	const [editContent, setEditContent] = useState(content);
	const [isEdit, setIsEdit] = useState(false);

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

	const deleteComment = () => {
		fetch(`http://localhost:3001/comments/${postId}/${_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		dispatch(removeComment({ _id, postId }));
		handleClose();
	};

	const patchContent = async () => {
		if (editContent !== content) {
			await fetch(`http://localhost:3001/comments/${_id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: editContent }),
			});

			dispatch(updateCommentContent({ _id, postId, content: editContent }));
		}

		setIsEdit(!isEdit);
	};

	return (
		<Box mt='0.5rem' key={`${_id}`}>
			<Divider sx={{ my: 0.5 }} />
			<Box display='flex' gap='0.5rem'>
				<UserImage image={userPicturePath} size='35px' />
				<Box mt='0.3rem'>
					<Typography variant='h6'>
						{firstName} {lastName}
					</Typography>
				</Box>
			</Box>
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

						<MenuItem onClick={deleteComment} disableRipple>
							<DeleteOutlinedIcon />
							Delete
						</MenuItem>
					</StyledMenu>
				</Box>
			)}
		</Box>
	);
};
