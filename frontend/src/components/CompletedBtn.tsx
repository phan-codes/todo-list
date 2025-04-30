import { CheckCheck } from "lucide-react";

interface CompletedBtnProps {
	_id: string | undefined;
	status: string;
	handleUpdateStatus: (_id: string | undefined, status: string) => void;
}

const CompletedBtn = ({ _id, status, handleUpdateStatus }: CompletedBtnProps) => {
	return (
		<button className="cursor-pointer p-1 rounded hover:bg-red-50/10" onClick={() => handleUpdateStatus(_id, status)}>
			<CheckCheck size={20} className="text-green-400" />
		</button>
	);
};

export default CompletedBtn;
