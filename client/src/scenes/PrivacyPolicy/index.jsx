import { Box, Typography, useTheme } from "@mui/material";

export const PrivacyPolicy = () => {
	const theme = useTheme();

	return (
		<Box
			textAlign='center'
			display={"block"}
			gap='0.5rem'
			p='2rem'
			m='2rem auto'
			sx={{ width: "auto", fontSize: 22 }}
		>
			<Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
				<Typography fontWeight='bold' fontSize='32px' color='primary.dark'>
					SocialSpark
				</Typography>
			</Box>
			<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
				<Typography variant='h2' textAlign='center' fontWeight='medium' mt={2}>
					Privacy Policy
				</Typography>

				<Typography mt={2} variant='subtitle1' gutterBottom>
					At SocialSpark, we value your privacy and are committed to protecting your personal
					information. This Privacy Policy explains how we collect, use, and safeguard the data you
					provide when using our social media app. By using SocialSpark, you consent to the terms
					outlined in this policy.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Information Collection: 1.1.
				</Typography>
				<Typography variant='h5' fontWeight='regular'>
					Personal Information:
				</Typography>
				<Typography gutterBottom>
					We may collect personal information such as your name, email address, profile picture, and
					other information you voluntarily provide during the registration process or while using
					our app. 1.2. Usage Data: We may collect non-personal information about your interactions
					with our app, including but not limited to, your device information, IP address, app usage
					patterns, and preferences.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Information Usage:
				</Typography>
				<Typography gutterBottom>
					2.1. Personalization: We use the information collected to personalize your experience,
					tailor content, and improve our app's functionality. 2.2. Communication: We may use your
					email address to send you important updates, notifications, and promotional materials. You
					can opt-out of these communications at any time. 2.3. Analytics: We may analyze and
					aggregate non-personal information for research, statistical, and business purposes to
					enhance the overall user experience.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Information Sharing:
				</Typography>
				<Typography gutterBottom>
					3.1. Third-Party Service Providers: We may engage trusted third-party service providers to
					assist us in app development, analytics, customer support, or other related services.
					These providers are obligated to protect your data and are prohibited from using it for
					any other purposes. 3.2. Legal Compliance: We may disclose personal information if
					required by law or in good faith belief that such action is necessary to comply with legal
					obligations, protect our rights, or investigate potential violations of our policies.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Data Security:
				</Typography>
				<Typography gutterBottom>
					4.1. We implement industry-standard security measures to protect your personal information
					from unauthorized access, disclosure, alteration, or destruction. 4.2. However, please
					note that no method of data transmission or storage is 100% secure. While we strive to
					protect your information, we cannot guarantee absolute security.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Children's Privacy:
				</Typography>
				<Typography gutterBottom>
					5.1. SocialSpark is not intended for users under the age of 13. We do not knowingly
					collect personal information from individuals under 13 years of age. If we become aware
					that a user is under 13, we will promptly delete their information.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Changes to this Privacy Policy:
				</Typography>
				<Typography gutterBottom>
					6.1. We may update this Privacy Policy from time to time. Any changes will be posted on
					our app, and your continued use of SocialSpark after such modifications constitutes
					acceptance of the revised policy.
				</Typography>

				<Typography gutterBottom mt={2}>
					Please review this Privacy Policy periodically to stay informed about how we protect your
					privacy. If you have any questions or concerns about our practices, please contact us.
				</Typography>
			</Box>
		</Box>
	);
};
