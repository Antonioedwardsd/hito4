import { userService } from "./user.service";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils";

const loginUser = async (email: string, password: string) => {
	const user = await userService.getUserByEmail(email);

	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Invalid password");
	}
	const token = generateToken(user.email, user.id);

	return token;
};

const registerUser = async (email: string, password: string) => {
	const newUser = await userService.createUser(email, password);
	const token = generateToken(newUser.email, newUser.id);

	return { user: newUser, token };
};

export const authService = {
	loginUser,
	registerUser,
};
