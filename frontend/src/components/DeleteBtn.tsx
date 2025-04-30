import { Trash2Icon } from "lucide-react";

interface DeleteBtnProps {
	_id: string | undefined;
	handleDelete: (id: string | undefined) => Promise<void>;
}
const DeleteBtn = ({ handleDelete, _id }: DeleteBtnProps) => {
	return (
		<button className="cursor-pointer p-1 rounded hover:bg-red-50/10" onClick={() => handleDelete(_id)}>
			<Trash2Icon size={20} className="text-red-500" />
		</button>
	);
};

export default DeleteBtn;
