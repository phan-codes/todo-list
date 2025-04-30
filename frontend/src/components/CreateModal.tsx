import { useState } from "react";
import useModalStore from "../store/modalStore";
import { TodoProp, useTodoStore } from "../store/useTodoStore";
import { toast } from "react-toastify";

const CreateModal = () => {
	const { isOpen, closeModal } = useModalStore();
	const { addTodo, fetchTodos } = useTodoStore();
	const [newTodo, setNewTodo] = useState<TodoProp>({
		title: "",
		details: "",
		status: "Pending",
	});

	const handleAddTodo = async () => {
		const { success, message } = await addTodo(newTodo);
		closeModal();

		if (!success) {
			toast.error(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
			});
		} else {
			toast.success(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
			});
			setNewTodo({ title: "", details: "", status: "Pending" });
			fetchTodos();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 bg-black/10 overflow-hidden flex items-center justify-center px-5 text-white z-50 rounded-2xl max-w-[500px] mx-auto inset-y-10 ${
				!isOpen ? "hidden" : "block"
			}`}>
			<div className="bg-gray-700 w-full rounded-2xl py-4 px-5 flex flex-col gap-5">
				<h1 className="font-semibold text-2xl">Add a task</h1>
				<input
					name="title"
					type="text"
					placeholder="Task"
					className="w-full h-10 border-b border-gray-300 outline-0"
					value={newTodo.title}
					onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
				/>
				<textarea
					name="details"
					placeholder="Task details"
					className="w-full h-10 border-b border-gray-300 outline-0 "
					value={newTodo.details}
					onChange={(e) => setNewTodo({ ...newTodo, details: e.target.value })}
				/>
				<div className="self-end flex justify-between w-fit gap-4 mt-5">
					<button className="rounded-xl p-2 bg-[#f5f5f5] text-black font-semibold cursor-pointer" onClick={closeModal}>
						Cancel
					</button>
					<button
						className="rounded-xl py-2 px-5 bg-green-400 text-black font-semibold cursor-pointer"
						onClick={handleAddTodo}>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateModal;
