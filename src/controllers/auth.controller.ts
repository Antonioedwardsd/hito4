import { Request, Response } from "express";
import { authService } from "../services/auth.service";

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const token = await authService.loginUser(email, password);
		res.json({ token });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An error occurred" });
		}
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const newUser = await authService.registerUser(email, password);
		res.json({ newUser });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An error occurred" });
		}
	}
};

export const authController = {
	login,
	register,
};
