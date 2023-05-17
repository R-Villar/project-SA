import { Grid, List, ListItemText, Button, Typography, useTheme, Box } from "@mui/material";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";

export const Footer = () => {
	const theme = useTheme();

	return (
		<Box
			width='100%'
			backgroundColor={theme.palette.background.alt}
			p='1rem 6%'
			textAlign='center'
      mt={20}
			sx={{ bottom: 0, position: "relative", width: "100%" }}
		>
			<Grid container justifyContent='center'>
				<Grid item md={4} lg={4}>
					<Typography color='primary.dark' variant='h4'>
						About us
					</Typography>
					<Typography variant='caption2'>
						At SocialSpark, we believe in the transformative power of connections. Our mission is
						to create a social media app that brings people closer together, fostering meaningful
						relationships, and promoting authentic interactions in the digital world.
					</Typography>
					<Box m='1rem auto'>
						<IconButton
							target='_blank'
							rel='noreferrer'
							href='https://www.facebook.com/'
							aria-label='facebook'
						>
							<FacebookIcon />
						</IconButton>
						<IconButton
							target='_blank'
							rel='noreferrer'
							href='https://twitter.com/'
							aria-label='twitter'
						>
							<TwitterIcon />
						</IconButton>
						<IconButton
							target='_blank'
							rel='noreferrer'
							href='https://www.instagram.com'
							aria-label='instagram'
						>
							<InstagramIcon />
						</IconButton>
					</Box>
				</Grid>
				<Grid item md={6} lg={2}>
					<List>
						<ListItemText>
							<Button href="/privacy-policy" variant='caption2'>
								Privacy &amp; Policy
							</Button>
						</ListItemText>
						<ListItemText>
							<Typography lineHeight={2} variant='caption2'>
								Terms &amp; Conditions
							</Typography>
						</ListItemText>
					</List>
				</Grid>
			</Grid>
		</Box>
	);
};
