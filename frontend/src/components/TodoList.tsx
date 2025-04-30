import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useTodoStore } from "../store/useTodoStore";
import TodoCard from "./TodoCard";

const TodoList = () => {
	const { fetchTodos, todos } = useTodoStore();
	const sortedTodos = [...todos].sort((a, b) => {
		if (a.status === "Pending" && b.status === "Completed") return -1;
		if (a.status === "Completed" && b.status === "Pending") return 1;
		return 0;
	});

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);
	return (
		<div className="w-full flex flex-col gap-5">
			{sortedTodos.map((todo, index) => todo && <TodoCard todo={todo} key={index} />)}
			<ToastContainer />
		</div>
	);
};

export default TodoList;
