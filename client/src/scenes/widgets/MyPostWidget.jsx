import { EditOutlined, DeleteOutlined, ImageOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme, Button, IconButton } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "@/components/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state";
import { UserInputField } from "@/components/UserInputField";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";

export const MyPostWidget = ({ picturePath }) => {
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState("");
	const [rejected, setRejected] = useState([]);
	const { palette } = useTheme();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
  const baseUrl = useSelector((state) => state.baseUrl);
	const medium = palette.neutral.medium;
	const { enqueueSnackbar } = useSnackbar();

	const handlePost = async () => {
		const formData = new FormData();
		formData.append("userId", _id);
		formData.append("description", post);
		if (image) {
			formData.append("picture", image);
		}

		const response = await fetch(`${baseUrl}/posts`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});

		if (response.ok) {
			const posts = await response.json();
			dispatch(setPosts({ posts }));
			setImage(null);
			setPost("");
			enqueueSnackbar("Post created", { variant: "success" });
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	if (rejected.length) {
		enqueueSnackbar(rejected?.[0]?.errors?.[0]?.message, { variant: "error" });
		setRejected([]);
	}

	return (
		<WidgetWrapper>
			<FlexBetween gap='1.5rem'>
				<UserImage image={picturePath} />
				<UserInputField setPost={setPost} post={post} />
			</FlexBetween>
			{isImage && (
				<Box border={`1px solid ${medium}`} borderRadius='5px' mt='1rem' p='1rem'>
					<Dropzone
						accept={{
							"image/jpeg": [".jpeg", ".png", ".jpg", ".gif"],
						}}
						maxSize={1024 * 1000}
						multiple={false}
						onDrop={(acceptedFiles, rejectedFiles) => {
							setImage(acceptedFiles[0]);
							setRejected(rejectedFiles);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p='1rem'
									width='100%'
									sx={{ "&:hover": { cursor: "pointer" } }}
								>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add Image Here</p>
									) : (
										<FlexBetween>
											<Typography>{image.name}</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<Tooltip title='Remove Image' placement='top'>
										<IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
											<DeleteOutlined />
										</IconButton>
									</Tooltip>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}

			<Divider sx={{ margin: "1rem 0" }} />

			<FlexBetween>
				<FlexBetween
					gap='0.25rem'
					onClick={() => setIsImage(!isImage)}
					sx={{ "&:hover": { cursor: "pointer", color: medium } }}
				>
					<ImageOutlined />
					<Typography>Image</Typography>
				</FlexBetween>
				<Button
					variant='contained'
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: palette.background.alt,
						backgroundColor: palette.primary.main,
						borderRadius: "3rem",
					}}
				>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	);
};
