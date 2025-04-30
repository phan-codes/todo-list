import { create } from "zustand";

export interface UseModalStoreProps {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

const useModalStore = create<UseModalStoreProps>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
