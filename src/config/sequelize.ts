import { Sequelize } from "sequelize-typescript";
import User from "../models/user.model";
import Task from "../models/task.model";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
	dialect: "postgres",
	host: "localhost",
	username: "postgres",
	password: "root",
	database: "hito_4",
	port: 5434,
	models: [User, Task],
	logging: false,
});
