import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state";
import { PostWidget } from "./PostWidget";
import { useSnackbar } from "notistack";

export const PostsWidget = ({ setIsLoading, isLoading, userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);
	const { enqueueSnackbar } = useSnackbar();

	const getPosts = async () => {
		const response = await fetch("http://localhost:3001/posts", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setPosts({ posts: data }));
		} else {
			const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
		}
	};

	const getUserPosts = async () => {
		const response = await fetch(`http://localhost:3001/posts/userPost/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(setPosts({ posts: data }));
		} else {
      const error = await response.json();
			enqueueSnackbar(error.message, { variant: "error" });
    }
	};

	useEffect(() => {
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
		setIsLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{posts.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => (
					<PostWidget
						isLoading={isLoading}
						key={_id}
						postId={_id}
						postUserId={userId}
						name={`${firstName} ${lastName}`}
						description={description}
						location={location}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
				)
			)}
		</>
	);
};
