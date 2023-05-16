import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "@/components/UserImage";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const { enqueueSnackbar } = useSnackbar();
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) {
			const data = await response.json();
			setUser(data);
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!user) {
		return null;
	}

	const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

	return (
		<WidgetWrapper>
			{/* FIRST ROW */}
			<FlexBetween gap='0.5rem' pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
				<FlexBetween gap='1rem'>
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant='h4'
							color={dark}
							fontWeight='500'
							sx={{
								"&:hover": {
									cursor: "pointer",
								},
							}}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{friends.length} friends</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>
			<Divider />
			{/* SECOND ROW */}
			<Box p='1rem 0'>
				<Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
					<LocationOnOutlined fontSize='large' sx={{ color: main }} />
					<Typography>{location}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
					<Typography>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />
			{/* THIRD ROW */}
			<Box p='1rem 0'>
				<FlexBetween mb='0.5rem'>
					<Typography>Who's viewed your profile</Typography>
					<Typography color={main} fontWeight='500'>
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween>
					<Typography>Impressions of your post</Typography>
					<Typography color={main} fontWeight='500'>
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};
