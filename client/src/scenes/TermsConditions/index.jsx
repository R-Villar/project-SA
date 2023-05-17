import { Box, Typography, useTheme } from "@mui/material";

export const TermsConditions = () => {
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
					Terms and Conditions
				</Typography>

				<Typography mt={2} variant='subtitle1' gutterBottom>
					Please read these Terms and Conditions carefully before using the SocialSpark app. These
					Terms and Conditions govern your use of the app and constitute a legal agreement between
					you and SocialSpark. By accessing or using the app, you agree to be bound by these Terms
					and Conditions.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					User Accounts:
				</Typography>
				<Typography gutterBottom>
					1.1. You must be at least 13 years old to create an account and use the SocialSpark app.
					1.2. You are responsible for maintaining the confidentiality of your account credentials
					and ensuring the accuracy of the information provided during registration. 1.3. You are
					solely responsible for any activity that occurs under your account.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					User Conduct:
				</Typography>
				<Typography gutterBottom>
					2.1. You agree to use SocialSpark in a lawful and appropriate manner, refraining from any
					activities that may violate applicable laws, regulations, or the rights of others. 2.2.
					You are prohibited from posting or sharing content that is offensive, defamatory,
					infringing, or violates the privacy or intellectual property rights of others. 2.3. You
					are responsible for the content you post, and SocialSpark reserves the right to remove any
					content that violates these Terms and Conditions.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Intellectual Property:
				</Typography>
				<Typography gutterBottom>
					3.1. SocialSpark and its associated logos, trademarks, and content are the property of
					SocialSpark or its licensors and are protected by intellectual property laws. 3.2. You may
					not use, copy, reproduce, modify, or distribute any content from the app without prior
					written permission from SocialSpark.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Third-Party Links:
				</Typography>
				<Typography gutterBottom>
					4.1. SocialSpark may contain links to third-party websites or services that are not owned
					or controlled by us. 4.2. We do not endorse or assume any responsibility for the content,
					privacy policies, or practices of these third-party websites or services. 4.3. Your
					interactions with these third-party websites or services are at your own risk, and you
					should review their terms and privacy policies before using them.
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
					Limitation of Liability:
				</Typography>
				<Typography gutterBottom>
					5.1. SocialSpark is provided on an "as-is" and "as available" basis. We do not guarantee
					the accuracy, reliability, or availability of the app and its content. 5.2. SocialSpark
					shall not be liable for any indirect, incidental, special, or consequential damages
					arising out of or in connection with your use of the app.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Modifications and Termination:
				</Typography>
				<Typography gutterBottom>
					6.1. SocialSpark reserves the right to modify, suspend, or terminate the app or these
					Terms and Conditions at any time without prior notice. 6.2. We may also terminate or
					suspend your account if you violate these Terms and Conditions or engage in any unlawful
					activities.
				</Typography>

				<Typography variant='h5' fontWeight='medium' mt={2}>
					Governing Law:
				</Typography>
				<Typography gutterBottom>
					7.1. These Terms and Conditions shall be governed by and construed in accordance with the
					law. 7.2. Any disputes arising out of or relating to these Terms and Conditions shall be
					subject to the exclusive jurisdiction of the courts.
				</Typography>

				<Typography gutterBottom mt={2}>
					By using SocialSpark, you agree to comply with these Terms and Conditions. If you have any
					questions or concerns, please contact us.
				</Typography>
			</Box>
		</Box>
	);
};
