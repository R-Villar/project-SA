import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, FormGroup } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";
import { useSnackbar } from "notistack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const registerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
	location: yup.string().required("required"),
	occupation: yup.string().required("required"),
	picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: "",
};

const initialValuesLogin = {
	email: "",
	password: "",
};

export const Form = () => {
	const [pageType, setPageType] = useState("login");
	const { palette } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const isLogin = pageType === "login";
	const isRegister = pageType === "register";
	const { enqueueSnackbar } = useSnackbar();
	const [rejected, setRejected] = useState([]);
	const [checked, setChecked] = useState(false);

	const register = async (values, onSubmitProps) => {
		if (!checked) {
			enqueueSnackbar("Please agree to the terms and conditions", { variant: "error" });
			return;
		}

		// this allows us to send form info with image
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}

		const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
			method: "POST",
			body: formData,
		});

		if (savedUserResponse.ok) {
			const responseData = await savedUserResponse.json();
			enqueueSnackbar(responseData, { variant: "success" });
			onSubmitProps.resetForm();
			setPageType("login");
		} else {
			const responseData = await savedUserResponse.json();
			enqueueSnackbar(responseData, { variant: "error" });
		}
	};

	const login = async (values, onSubmitProps) => {
		const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		if (loggedInResponse.ok) {
			const loggedIn = await loggedInResponse.json();
			onSubmitProps.resetForm();
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			);
			navigate("/home");
		} else {
			const responseData = await loggedInResponse.json();
			enqueueSnackbar(responseData.error, { variant: "error" });
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isLogin) await login(values, onSubmitProps);
		if (isRegister) await register(values, onSubmitProps);
	};

	if (rejected.length) {
		enqueueSnackbar(rejected?.[0]?.errors?.[0]?.message, { variant: "error" });
		setRejected([]);
	}

	const handleChecked = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<form name='register-form' onSubmit={handleSubmit}>
					<Box
						display='grid'
						gap='30px'
						gridTemplateColumns='repeat(4, minmax(0, 1fr))'
						sx={{
							"& > div": {
								gridColumn: isNonMobile ? undefined : "span 4",
							},
						}}
					>
						{/* REGISTER */}
						{isRegister && (
							<>
								<TextField
									required
									label='First Name'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name='firstName'
									error={Boolean(touched.firstName) && Boolean(errors.firstName)}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									required
									label='Last Name'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name='lastName'
									error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									required
									label='Location'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.location}
									name='location'
									error={Boolean(touched.location) && Boolean(errors.location)}
									helperText={touched.location && errors.location}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									required
									label='Occupation'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.occupation}
									name='occupation'
									error={Boolean(touched.occupation) && Boolean(errors.occupation)}
									helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: "span 4" }}
								/>
								<Box
									gridColumn='span 4'
									border={
										!errors.picture
											? `1px solid ${palette.neutral.medium}`
											: `1px solid ${palette.error.main}`
									}
									borderRadius='5px'
									p='1rem'
								>
									<Dropzone
										accept={{
											"image/jpeg": [".jpeg", ".png", ".jpg", ".gif"],
										}}
										maxSize={1024 * 1000}
										multiple={false}
										onDrop={(acceptedFiles, rejectedFiles) => {
											setFieldValue("picture", acceptedFiles[0]);
											setRejected(rejectedFiles);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p='1rem'
												sx={{
													"&:hover": {
														cursor: "pointer",
													},
												}}
											>
												<input {...getInputProps()} />
												{!values.picture ? (
													<Typography>Add Profile Picture Here</Typography>
												) : (
													<FlexBetween>
														<Typography>{values.picture.name}</Typography>
														<EditOutlinedIcon />
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
									{errors.picture ? (
										<Typography variant='caption' color='error.main'>
											{errors.picture}
										</Typography>
									) : null}
								</Box>
							</>
						)}
						{/* LOGIN */}
						<TextField
							label='Email'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name='email'
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
							label='Password'
							type='password'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name='password'
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 4" }}
						/>
					</Box>

					{isRegister && (
						<FormControlLabel
							required
							control={<Checkbox checked={checked} onChange={handleChecked} />}
							label={
								<>
									<span>I agree to the </span>
									<a href='/terms-conditions' target='_blank' rel='noreferrer'>
										Terms &amp; Conditions
									</a>
								</>
							}
						/>
					)}

					{/* BUTTONS */}
					<Box>
						<Button
							variant='contained'
							fullWidth
							type='submit'
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: palette.primary.main,
								color: palette.background.alt,
								"&:hover": { color: palette.primary.main },
							}}
						>
							{isLogin ? "LOGIN" : "REGISTER"}
						</Button>
						<Button
							size='small'
							variant='text'
							onClick={() => {
								setPageType(isLogin ? "register" : "login");
								resetForm();
							}}
							sx={{
								textDecoration: "underline",
								color: palette.primary.main,
								"&:hover": {
									cursor: "pointer",
									color: palette.primary.main,
								},
							}}
						>
							{isLogin
								? "Don't have an account? Sign Up here."
								: "Already have an account? Login here."}
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};
