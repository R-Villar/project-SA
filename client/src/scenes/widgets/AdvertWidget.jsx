import { Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import Skeleton from "@mui/material/Skeleton";

export const AdvertWidget = ({ isLoading }) => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant='h5' fontWeight='500'>
					Sponsored
				</Typography>
				<Typography color={medium}>Create Ad</Typography>
			</FlexBetween>
			{isLoading ? (
				<Skeleton animation='wave' variant='rectangular' width='100%'>
					<div style={{ paddingTop: "57%" }} />
				</Skeleton>
			) : (
				<img
					width='100%'
					height='auto'
					alt='advert'
					src='http://localhost:3001/assets/info4.jpeg'
					style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
				/>
			)}

			<FlexBetween>
				<Typography color={main}>Kathy Cosmetics</Typography>
				<Typography color={medium}>kathycosmetics.com</Typography>
			</FlexBetween>
			<Typography color={medium} m='0.5rem 0'>
				Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and
				shining like light
			</Typography>
		</WidgetWrapper>
	);
};
