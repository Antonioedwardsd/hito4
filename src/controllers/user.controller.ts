import { Request, Response } from "express";
import { userService } from "../services/user.service";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.getAllUsers();
		res.json({ email: req.email, users });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).send("An unexpected error occurred");
		}
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.getUserById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).send("Server error occurred");
		}
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const newUser = await userService.createUser(email, password);
		res.status(201).json(newUser);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).send("Server error occurred");
		}
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const updatedUser = await userService.updateUser(
			req.params.id,
			email,
			password
		);
		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).send("Server error occurred");
		}
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const deletedUser = await userService.deleteUser(req.params.id);
		if (!deletedUser) {
			res.status(404).json({ message: "User not found" });
		}
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).send("An unexpected error occurred");
		}
	}
};

export const userController = {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
