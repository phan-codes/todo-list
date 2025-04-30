import { SquarePen } from "lucide-react";
import { UpdatedTodoProps } from "./TodoCard";

interface EditBtnProps {
	todo: UpdatedTodoProps;
	setUpdatedTodo: React.Dispatch<React.SetStateAction<UpdatedTodoProps>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBtn = ({ todo, setUpdatedTodo, isOpen, setIsOpen }: EditBtnProps) => {
	const handleEdit = () => {
		setUpdatedTodo({
			id: todo.id,
			title: todo.title,
			details: todo.status,
			status: todo.status,
		});
		setIsOpen(!isOpen);
	};
	return (
		<button className="cursor-pointer p-1 rounded hover:bg-red-50/10" onClick={handleEdit}>
			<SquarePen size={20} className="text-amber-300" />
		</button>
	);
};

export default EditBtn;
