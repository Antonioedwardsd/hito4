import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { pool } from "../config/database";

const getAllUsers = async () => {
	const query = {
		text: `SELECT * FROM users`,
	};
	const { rows } = await pool.query(query);
	return rows;
};

const getUserByEmail = async (email: string) => {
	const user = await UserModel.findOneByEmail(email);
	return user;
};

const getUserById = async (id: string) => {
	const query = {
		text: `SELECT * FROM users WHERE id = $1`,
		values: [id],
	};
	const { rows } = await pool.query(query);
	return rows[0];
};

const createUser = async (email: string, password: string) => {
	const user = await UserModel.findOneByEmail(email);

	if (user) {
		throw new Error("User already exists");
	}

	const saltPassword = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, saltPassword);

	const newUser = await UserModel.create(email, hashedPassword);

	return newUser;
};

const updateUser = async (id: string, email: string, password: string) => {
	const saltPassword = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, saltPassword);

	const query = {
		text: `UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *`,
		values: [email, hashedPassword, id],
	};

	const { rows } = await pool.query(query);
	return rows[0];
};

const deleteUser = async (id: string) => {
	const query = {
		text: `DELETE FROM users WHERE id = $1 RETURNING *`,
		values: [id],
	};

	const { rows } = await pool.query(query);
	return rows[0];
};

export const userService = {
	getAllUsers,
	createUser,
	getUserByEmail,
	getUserById,
	updateUser,
	deleteUser,
};
