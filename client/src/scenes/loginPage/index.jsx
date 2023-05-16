import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Form } from "./Form";
import { Footer } from "@/components/Footer";

export const LoginPage = () => {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	return (
		<Box>
			<Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
				<Typography fontWeight='bold' fontSize='32px' color='primary.dark'>
					Social App
				</Typography>
			</Box>
			<Box
				width={isNonMobileScreens ? "50%" : "93%"}
				p='2rem'
				m='2rem auto'
				borderRadius='1.5rem'
				backgroundColor={theme.palette.background.alt}
			>
				<Typography textAlign='center' fontWeight='500' variant='h5' sx={{ mb: "1.5rem" }}>
					Log into my Social App
				</Typography>
				<Form />
			</Box>
			<Footer />
		</Box>
	);
};
