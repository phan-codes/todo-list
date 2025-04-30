import { UpdatedTodoProps } from "./TodoCard";

interface UpdateModalProps {
	id: string | undefined;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedTodo: UpdatedTodoProps;
	setUpdatedTodo: React.Dispatch<React.SetStateAction<UpdatedTodoProps>>;
	handleUpdateTodo: (id: string, updatedTodo: UpdatedTodoProps) => void;
}
const UpdateModal = ({ isOpen, setIsOpen, updatedTodo, setUpdatedTodo, handleUpdateTodo, id }: UpdateModalProps) => {
	return (
		<div
			className={`fixed inset-0 bg-black/50 overflow-hidden flex items-center justify-center px-5 text-white z-50 rounded-2xl max-w-[500px] mx-auto inset-y-10 ${
				!isOpen ? "hidden" : "block"
			}`}>
			<div className="bg-gray-700 w-full rounded-2xl py-4 px-5 flex flex-col gap-5">
				<h1 className="font-semibold text-2xl">Update Task</h1>
				<input
					name="title"
					type="text"
					placeholder="Task"
					className="w-full h-10 border-b border-gray-300 outline-0"
					value={updatedTodo.title}
					onChange={(e) => setUpdatedTodo({ ...updatedTodo, title: e.target.value })}
				/>
				<textarea
					name="details"
					placeholder="Task details"
					className="w-full h-10 border-b border-gray-300 outline-0 "
					value={updatedTodo.details}
					onChange={(e) => setUpdatedTodo({ ...updatedTodo, details: e.target.value })}
				/>
				<div className="self-end flex justify-between w-fit gap-4 mt-5">
					<button
						className="rounded-xl p-2 bg-[#f5f5f5] text-black font-semibold cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}>
						Cancel
					</button>
					<button
						className="rounded-xl py-2 px-5 bg-green-400 text-black font-semibold cursor-pointer"
						onClick={() => handleUpdateTodo(id!, updatedTodo)}>
						Update
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateModal;
