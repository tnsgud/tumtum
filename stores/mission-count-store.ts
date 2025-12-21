import { create } from "zustand";

type State = {
	count: number;
};

type Action = {
	setCount: (v: number) => void;
};

const useMissionCount = create<State & Action>((set) => ({
	count: 0,
	setCount: (count) => set({ count }),
}));

export { useMissionCount };
