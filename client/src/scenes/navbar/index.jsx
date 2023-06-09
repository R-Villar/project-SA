import { useState } from "react";
import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "@/state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween";

export const Navbar = () => {
	const [isMobileMenuToggled, setIsMenuMobileToggled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	const theme = useTheme();
	const neutralLight = theme.palette.neutral.light;
	const dark = theme.palette.neutral.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.main;
	const alt = theme.palette.background.alt;

	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<FlexBetween padding='1rem 6%' backgroundColor={alt}>
			<FlexBetween gap='1.5rem'>
				<Typography
					fontWeight='bold'
					fontSize='clamp(1rem, 2rem, 2.25rem)'
					color='primary.dark'
					onClick={() => navigate("/home")}
					sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
				>
					SocialSpark
				</Typography>
			</FlexBetween>
			{/* DESKTOP NAV */}
			{isNonMobileScreens ? (
				<FlexBetween gap='2rem'>
					<IconButton aria-label="light/dark mode" onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkMode sx={{ fontSize: "25px" }} />
						) : (
							<LightMode sx={{ color: dark, fontSize: "25px" }} />
						)}
					</IconButton>
					<FormControl variant='standard' value={fullName}>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: "150px",
								borderRadius: "0.25rem",
								"& .MuiSvgIcon-root": {
									pr: "0.25rem",
									width: "3rem",
								},
								"& .MuiSelect-select:focus": {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton onClick={() => setIsMenuMobileToggled(!isMobileMenuToggled)}>
					<Menu />
				</IconButton>
			)}
			{/* MOBILE NAV*/}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box
					position='fixed'
					right='0'
					bottom='0'
					height='100%'
					zIndex='10'
					maxWidth='500px'
					minWidth='300px'
					backgroundColor={background}
				>
					{/* CLOSE ICON */}
					<Box display='flex' justifyContent='flex-end' p='1rem'>
						<IconButton onClick={() => setIsMenuMobileToggled(!isMobileMenuToggled)}>
							<Close />
						</IconButton>
					</Box>
					{/* MENU ITEMS */}
					<FlexBetween
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						gap='3rem'
					>
						<IconButton onClick={() => dispatch(setMode())} sx={{ fontsize: "25px" }}>
							{theme.palette.mode === "dark" ? (
								<DarkMode sx={{ fontSize: "25px" }} />
							) : (
								<LightMode sx={{ color: dark, fontSize: "25px" }} />
							)}
						</IconButton>
						<FormControl variant='standard' value={fullName}>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: "150px",
									borderRadius: "0.25rem",
									"& .MuiSvgIcon-root": {
										pr: "0.25rem",
										width: "3rem",
									},
									"& .MuiSelect-select:focus": {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};
