import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/sequelize";
import authRoute from "./routes/auth.route";
import userRouter from "./routes/user.route";
import taskRoute from "./routes/task.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tasks", taskRoute);

const main = async () => {
	try {
		// DB con Sequelize
		await sequelize.authenticate();
		console.log("Database connected successfully");

		await sequelize.sync({ force: true });
		console.log("Database synchronized");

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

main();
