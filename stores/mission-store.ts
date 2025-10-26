import { FliterOption, Mission } from "@/components/mission/types";
import { dateFormat } from "@/lib/date-utils";
import { browserClient } from "@/lib/supabase.browser";
import { isFuture, isToday } from "date-fns";
import { create } from "zustand";

type State = {
	missions: Mission[];
	searchText: string;
	fliteredMissions: Mission[];
	fliterOption: FliterOption;
};

type Action = {
	setMissions: (v: Mission[]) => void;
	setSearchText: (v: string) => void;
	setFliterOption: (v: FliterOption) => void;
	refresh: () => Promise<void>;
};

function optionFliter(m: Mission, fliterOption: FliterOption) {
	const missionDate = dateFormat(m.deadline_at);

	switch (fliterOption) {
		case FliterOption.TODAY:
			return isToday(missionDate);
		case FliterOption.UPCOMING:
			return isFuture(missionDate) && !m.is_completed;
		case FliterOption.COMPLETED:
			return m.is_completed;
		case FliterOption.NOT_COMPLETED:
			return !m.is_completed;
		default:
			return true;
	}
}

function titleFliter(title: string, searchText: string) {
	return title.includes(searchText);
}

const useMissionStore = create<State & Action>((set, get) => ({
	missions: [],
	fliteredMissions: [],
	searchText: "",
	fliterOption: FliterOption.ALL,
	setMissions: (missions) => {
		// const { fliterOption, searchText } = get();
		// const missions = data.filter((m) => optionFliter(m, fliterOption)).filter(({title})=>textFliter(title, searchText))

		set({ missions, fliteredMissions: missions });
	},
	setSearchText: (searchText) => {
		const { fliteredMissions } = get();
		const newFliteredMissions = fliteredMissions.filter(({ title }) =>
			titleFliter(title, searchText),
		);

		set({ fliteredMissions: newFliteredMissions, searchText });
	},
	setFliterOption: (fliterOption) => {
		const { fliteredMissions } = get();
		const newFliteredMissions = fliteredMissions.filter((m) =>
			optionFliter(m, fliterOption),
		);

		set({ fliteredMissions: newFliteredMissions, fliterOption });
	},
	refresh: async () => {
		const supabase = browserClient();
		const { data, error } = await supabase
			.from("mission")
			.select(
				"id, title, deadline_at, is_completed, priority, category(color, name)",
			)
			.is("deleted_at", null)
			.order("created_at", { ascending: false });

		if (error || !data) {
			return;
		}

		set({ missions: data, searchText: "", fliterOption: FliterOption.ALL });
	},
}));

export { useMissionStore };
