import { TabOption, Mission } from "@/components/mission/types";
import { dateFormat } from "@/lib/date-utils";
import { browserClient } from "@/lib/supabase.browser";
import { isFuture, isToday } from "date-fns";
import { create } from "zustand";

type State = {
	missions: Mission[];
	searchText: string;
	filteredMissions: Mission[];
	filterOption: TabOption;
};

type Action = {
	setMissions: (v: Mission[]) => void;
	setSearchText: (v: string) => void;
	setFilterOption: (v: TabOption) => void;
	refresh: () => Promise<void>;
};

function optionFilter(m: Mission, filterOption: TabOption) {
	const missionDate = dateFormat(m.deadline_at);

	switch (filterOption) {
		case TabOption.TODAY:
			return isToday(missionDate);
		case TabOption.UPCOMING:
			return isFuture(missionDate) && !m.is_completed;
		case TabOption.COMPLETED:
			return m.is_completed;
		case TabOption.NOT_COMPLETED:
			return !m.is_completed;
		default:
			return true;
	}
}

function titleFilter(title: string, searchText: string) {
	return title.includes(searchText);
}

const useMissionStore = create<State & Action>((set, get) => ({
	missions: [],
	filteredMissions: [],
	searchText: "",
	filterOption: TabOption.ALL,
	setMissions: (missions) => {
		// const { fliterOption, searchText } = get();
		// const missions = data.filter((m) => optionFliter(m, fliterOption)).filter(({title})=>textFliter(title, searchText))

		set({ missions, filteredMissions: missions });
	},
	setSearchText: (searchText) => {
		const { filteredMissions: filteredMissions } = get();
		const newFilteredMissions = filteredMissions.filter(({ title }) =>
			titleFilter(title, searchText),
		);

		set({ filteredMissions: newFilteredMissions, searchText });
	},
	setFilterOption: (filterOption) => {
		const { filteredMissions } = get();
		const newFilteredMissions = filteredMissions.filter((m) =>
			optionFilter(m, filterOption),
		);

		set({ filteredMissions: newFilteredMissions, filterOption });
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

		set({ missions: data, searchText: "", filterOption: TabOption.ALL });
	},
}));

export { useMissionStore };
