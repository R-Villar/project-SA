import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	const { enqueueSnackbar } = useSnackbar();

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	const isFriend = friends.find((friend) => friend._id === friendId);
	const isSelf = friendId === _id;

	const patchFriend = async () => {
		const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(setFriends({ friends: data }));
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	return (
		<Box sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}>
			<FlexBetween gap='1rem'>
				<UserImage image={userPicturePath} />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`);
						// work around for when you visit someone else's profile and try to navigate to one of their friends
						navigate(0);
					}}
				>
					<Typography
						color={main}
						variant='h5'
						fontWeight='500'
						sx={{
							"&:hover": {
								color: palette.primary.light,
								cursor: "pointer",
							},
						}}
					>
						{name}
					</Typography>
					<Typography color={medium} fontSize='0.75rem'>
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>
			<FlexBetween>
				{!isSelf && (
					<IconButton
						onClick={() => patchFriend()}
						sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
					>
						{isFriend ? (
							<PersonRemoveOutlined sx={{ color: primaryDark }} />
						) : (
							<PersonAddOutlined sx={{ color: primaryDark }} />
						)}
					</IconButton>
				)}
			</FlexBetween>
		</Box>
	);
};
