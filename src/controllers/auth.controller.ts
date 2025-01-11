import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user || !user.password) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const token = jwt.sign(
			{ uid: user.uid, email: user.email },
			process.env.JWT_SECRET || "defaultSecret",
			{ expiresIn: "24h" }
		);

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({
			error: error instanceof Error ? error.message : "An error occurred",
		});
	}
};

const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			res.status(400).json({ error: "Email already in use" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({ email, password: hashedPassword });

		const { uid, email: userEmail } = newUser.toJSON();
		res.status(201).json({
			newUser: {
				uid,
				email: userEmail,
			},
		});
	} catch (error) {
		res.status(500).json({
			error: error instanceof Error ? error.message : "An error occurred",
		});
	}
};

export const authController = {
	login,
	register,
};
