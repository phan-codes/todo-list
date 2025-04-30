import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { TodoProp, useTodoStore } from "../store/useTodoStore";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import UpdateModal from "./UpdateModal";
import CompletedBtn from "./CompletedBtn";

export interface UpdatedTodoProps {
	id?: string;
	title: string;
	details: string;
	status: string;
}

const TodoCard = ({ todo }: { todo: TodoProp }) => {
	const [updatedTodo, setUpdatedTodo] = useState<UpdatedTodoProps>({
		id: todo._id,
		title: todo.title,
		details: todo.details,
		status: todo.status,
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { deleteTodo, updateTodo, updateStatus } = useTodoStore();

	const handleDelete = async (id: string | undefined) => {
		const { success, message } = await deleteTodo(id);

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
		}
	};

	const handleUpdateTodo = async (id: string, updatedTodo: UpdatedTodoProps) => {
		const { success, message } = await updateTodo(id, updatedTodo);

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
			setIsOpen(!isOpen);
		}
	};

	const handleUpdateStatus = async (id: string | undefined, currentStatus: string) => {
		const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
		const { success, message } = await updateStatus(id, newStatus);

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
		} else if (success && newStatus === "Completed") {
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
		}
	};

	const time = useMemo(() => {
		const created = todo.createdAt && new Date(todo.createdAt);
		const now = new Date().getTime();
		const TimeMs = now - created!.getTime();
		const minutes = Math.floor(TimeMs / (1000 * 60));

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}min${minutes > 1 ? "s" : ""} ago`;
		const hour = Math.floor(minutes / 60);
		if (hour < 24) return `${hour}hr${hour > 1 ? "s" : ""} ago`;
		return created?.toLocaleDateString();
	}, [todo.createdAt]);

	const updatedTime = useMemo(() => {
		const created = todo.updatedAt && new Date(todo.updatedAt);
		const now = new Date().getTime();
		const TimeMs = now - created!.getTime();
		const minutes = Math.floor(TimeMs / (1000 * 60));

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}min${minutes > 1 ? "s" : ""} ago`;
		const hour = Math.floor(minutes / 60);
		if (hour < 24) return `${hour}hr${hour > 1 ? "s" : ""} ago`;
		return created?.toLocaleDateString();
	}, [todo.updatedAt]);

	useEffect(() => {
		if (isOpen) {
			setUpdatedTodo({
				id: todo._id,
				title: todo.title,
				details: todo.details,
				status: todo.status,
			});
		}
	}, [isOpen, todo]);

	return (
		<div className="flex flex-col p-4 border-[1px] border-amber-100/20 border-solid rounded-2xl w-full gap-2 bg-gray-900">
			<div className="flex flex-col items-start w-full gap-2 md:flex-row md:items-center md:justify-between">
				<div className="my-3 w-full whitespace-normal break-words md:w-[70%]">
					<h1 className="font-semibold text-lg">{todo.title}</h1>
					<p className="text-sm">{todo.details}</p>
				</div>
				<div className="flex md:basis-[30%]">
					<div
						className={`rounded-full h-2 w-2 mx-2 ${todo.status === "Pending" ? "bg-red-700" : "bg-green-700"}`}></div>
					<p className="text-xs text-white/50">{todo.status}</p>
				</div>
			</div>
			<div className="self-start flex justify-between gap-1 md:self-end">
				<DeleteBtn handleDelete={handleDelete} _id={todo._id} />
				<EditBtn todo={todo} setUpdatedTodo={setUpdatedTodo} isOpen={isOpen} setIsOpen={setIsOpen} />
				<CompletedBtn handleUpdateStatus={handleUpdateStatus} _id={todo._id} status={todo.status} />
			</div>
			<div className="self-start flex flex-col gap-1 text-sm text-white/60 md:flex-row md:self-end md:gap-3">
				<p className={`${updatedTime === time ? "hidden" : "block"}`}>
					<em>
						<b>Updated</b>:
					</em>{" "}
					{updatedTime} |
				</p>
				<p>
					<b>Added</b>: {time}
				</p>
			</div>

			{/* MODAL */}
			<UpdateModal
				id={todo._id}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				updatedTodo={updatedTodo}
				setUpdatedTodo={setUpdatedTodo}
				handleUpdateTodo={handleUpdateTodo}
			/>
		</div>
	);
};

export default TodoCard;
