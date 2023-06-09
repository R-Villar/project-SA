import { Box, Typography, useTheme } from "@mui/material";
import { Friend } from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from 'uuid';

export const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	const { enqueueSnackbar } = useSnackbar();

	const dark = palette.neutral.dark;

	const getFriends = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(setFriends({ friends: data }));
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography color={dark} variant='h5' fontWeight='500' sx={{ mg: "1.5rem" }}>
				Friend List
			</Typography>
			<Box display='flex' flexDirection='column' gap='1.5rem'>
				{friends.map((friend) => (
					<Friend
						key={uuidv4()}
						friendId={friend._id}
						name={`${friend.firstName} ${friend.lastName}`}
						subtitle={friend.occupation}
						userPicturePath={friend.picturePath}
					/>
				))}
			</Box>
		</WidgetWrapper>
	);
};
