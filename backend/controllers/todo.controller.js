import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

const todoIndex = async (req, res) => {
	try {
		const todos = await Todo.find({}).sort({ createdAt: -1 });
		return res.status(200).json({ success: true, data: todos });
	} catch (error) {
		return res.status(400).json({ success: false, message: "Error fetching Tasks" });
	}
};

const createTodo = async (req, res) => {
	const todo = req.body;

	if (!todo.title || !todo.details || !todo.status) {
		return res.status(400).json({ success: false, message: "Please input a task" });
	} else if (todo.status != "Completed" && todo.status != "Pending") {
		return res.status(400).json({ success: false, message: "Invalid status" });
	}
	const newTodo = Todo(todo);

	try {
		await newTodo.save();
		return res.status(200).json({ success: true, message: "Task Added Successfully" });
	} catch (error) {
		return res.status(400).json({ success: false, message: "Error adding Task" });
	}
};

const updateTodo = async (req, res) => {
	const { id } = req.params;
	const todo = req.body;

	try {
		const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
		return res.status(200).json({ success: true, message: "Task has been updated", data: updatedTodo });
	} catch (error) {
		return res.status(400).json({ success: false, message: "Error Updating Task" });
	}
};

const deleteTodo = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid product id" });
	}

	try {
		await Todo.findByIdAndDelete(id);
		return res.status(200).json({ success: true, message: "Task has been deleted" });
	} catch (error) {
		return res.status(500).json({ success: false, message: "Server Error" });
	}
};

export { todoIndex, createTodo, updateTodo, deleteTodo };
