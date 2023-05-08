import { InputBase, useTheme } from "@mui/material";

export const UserInputField = (props) => {
	const { palette } = useTheme();

	return (
		<>
			<InputBase
				placeholder="What's on your mind..."
				onChange={(e) => props.setPost(e.target.value)}
				value={props.post}
				sx={{
					width: "100%",
					backgroundColor: palette.neutral.light,
					borderRadius: "2rem",
					padding: "0.5rem 2rem",
				}}
			/>
		</>
	);
};
