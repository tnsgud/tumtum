import { Mission } from "@/components/mission/types";
import { browserClient } from "@/lib/supabase.browser";
import { create } from "zustand";

type State = {
	missions: Mission[];
};

type Action = {
	setMissions: (v: Mission[]) => void;
	refresh: () => Promise<void>;
};

const useMissionStore = create<State & Action>((set, get) => ({
	missions: [],
	setMissions: (v) => set({ missions: v }),
	refresh: async () => {
		const supabase = browserClient();
		const { data, error } = await supabase
			.from("mission")
			.select(
				"id, title, deadline_at, is_completed, priority, category(color, name)",
			)
			.is("deleted_at", null)
			.order("created_at", { ascending: false });

		if (data) {
			set({
				missions: data,
			});
		}
	},
}));

export { useMissionStore };
