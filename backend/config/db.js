import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbURI = process.env.MONGO_URI;

export const connectDB = async () => {
	try {
		await mongoose.connect(dbURI);
		console.log("MongoDB is successfully connected");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
