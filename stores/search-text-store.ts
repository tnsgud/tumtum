import { create } from "zustand";

type State = {
	searchText: string;
};

type Action = {
	setSearchText: (v: string) => void;
};

const useSearchTextStore = create<State & Action>((set, get) => ({
	searchText: "",
	setSearchText: (value) => set({ searchText: value }),
}));

export { useSearchTextStore };
