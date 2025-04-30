import TodoList from "./TodoList";
import useModalStore from "../store/modalStore";
import CreateModal from "./CreateModal";

const Home = () => {
	const { openModal } = useModalStore();

	return (
		<section className="py-10 px-5 bg-gray-950 text-white">
			<div className="relative h-[90vh] overflow-y-scroll max-w-[500px] mx-auto rounded-2xl bg-gray-900 no-scrollbar">
				<div className="flex flex-col items-center justify-center gap-3 p-5 w-full md:p-10">
					<h1 className="font-bold text-3xl mb-3">All Tasks</h1>
					<TodoList />
				</div>
				<button
					className="fixed bottom-3.5 bg-amber-600 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow-gray-300 shadow-2xl"
					onClick={openModal}>
					<h1 className="text-4xl font-bold ">+</h1>
				</button>
			</div>
			<CreateModal />
		</section>
	);
};

export default Home;
