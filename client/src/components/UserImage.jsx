import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<CardMedia
				component='img'
				style={{ objectFit: "cover", borderRadius: "50%" }}
				width={size}
				height={size}
				alt='user'
				image={image}
			/>
		</Box>
	);
};

export default UserImage;
