import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../middleware/cloudinary.js";

// REGISTER USER
export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, friends, location, occupation } = req.body;

		const findOneEmail = await User.findOne({ email: email });

		if (findOneEmail) {
			return res.status(409).json("An account with that email already exists");
		}

		const result = await cloudinary.uploader.upload(req.file.path, {
			folder: "user_profile",
		});

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath: result.secure_url,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 1000),
			impressions: Math.floor(Math.random() * 1000),
		});

		await newUser.save();

		res.status(201).json("Account created successfully");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// LOGGING IN
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: "User does not exist." });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "invalid credentials." });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
