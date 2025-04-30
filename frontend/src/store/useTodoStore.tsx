import { create } from "zustand";

export interface TodoProp {
	_id?: string;
	title: string;
	details: string;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface TodoResult {
	success: boolean;
	message: string;
}

interface UseTodoStoreProp {
	todos: TodoProp[];
	setTodos: (todos: TodoProp[]) => void;
	addTodo: (newTodo: TodoProp) => Promise<TodoResult>;
	fetchTodos: () => void;
	deleteTodo: (id: string | undefined) => Promise<TodoResult>;
	updateTodo: (id: string | undefined, updatedTodo: TodoProp) => Promise<TodoResult>;
	updateStatus: (id: string | undefined, newStatus: string) => Promise<TodoResult>;
}

export const useTodoStore = create<UseTodoStoreProp>((set) => ({
	todos: [] as TodoProp[],
	setTodos: (todos: TodoProp[]) => set({ todos }),

	addTodo: async (newTodo) => {
		const response = await fetch("http://localhost:3000/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});

		if (!newTodo.title || !newTodo.details || !newTodo.status) {
			return { success: false, message: "Please input a task" };
		} else if (newTodo.status != "Completed" && newTodo.status != "Pending") {
			return { success: false, message: "Invalid status" };
		}

		const data = await response.json();
		set((state) => ({ todos: [...state.todos, data.data] }));
		return { success: true, message: "Todo has been successfully added" };
	},

	fetchTodos: async () => {
		const response = await fetch("http://localhost:3000/api/todos");
		const data = await response.json();
		set({ todos: data.data });
	},

	deleteTodo: async (id) => {
		const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
			method: "DELETE",
		});

		const data = await response.json();
		if (!data.success) {
			return { success: false, message: data.message };
		}

		set((state) => ({ todos: [...state.todos.filter((todo) => todo._id !== id)] }));
		return { success: true, message: data.message };
	},

	updateTodo: async (id, updatedTodo) => {
		const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json", // Add this line
			},
			body: JSON.stringify(updatedTodo),
		});

		const data = await response.json();
		if (!data.success) {
			return { success: false, message: data.message };
		}

		set((state) => ({ todos: [...state.todos.map((todo) => (todo._id === id ? data.data : todo))] }));
		return { success: true, message: data.message };
	},

	updateStatus: async (id, newStatus) => {
		const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json", // Add this line
			},
			body: JSON.stringify({ status: newStatus }),
		});

		const data = await response.json();
		if (!data.data) {
			return { success: false, message: "Error! This task is not completed" };
		}

		set((state) => ({ todos: state.todos.map((todo) => (todo._id === id ? { ...todo, status: newStatus } : todo)) }));
		return { success: true, message: "Hurray!!! You have completed this task" };
	},
}));
