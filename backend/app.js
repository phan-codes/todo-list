import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRouter from "./routes/todo.route.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
	try {
		connectDB();
		console.log(`Server is running on PORT: ${PORT}`);
	} catch (error) {
		console.log("Error", error.message);
	}
});
