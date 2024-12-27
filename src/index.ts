import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/database";
import authRoute from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRoute);

const main = async () => {
	try {
		const { rows } = await pool.query("SELECT NOW()");
		console.log(rows[0].now, "Database connected");
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

main();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwQG1haWwuY29tIiwidWlkIjoiNTNhMDJkY2MtNzM3MS00ZjI2LWI5MDctYjQyMTA4OTE1MGRhIiwiaWF0IjoxNzMzODU3ODA2LCJleHAiOjE3MzM4NjE0MDZ9.ddJ2BgySPe6AeeNZumBAsLi9r4chrtVu7NyvHfAPzLI
