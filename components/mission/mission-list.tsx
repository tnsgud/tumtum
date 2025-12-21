"use client";

import { useSearchTextStore } from "@/stores/search-text-store";
import { MissionListItem } from "./mission-list-item";
import { TabOption, Mission } from "./types";
import { dateFormat, isFuture, isToday } from "@/lib/date-utils";
import { useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase.browser";
import { useSWRConfig } from "swr";
import { useMissionCount } from "@/stores/mission-count-store";
import { set } from "date-fns";

type MissionListProps = {
	missions: Mission[];
	tab: TabOption;
};

export default function MissionList({ missions, tab }: MissionListProps) {
	const searchText = useSearchTextStore((state) => state.searchText);
	const setMissionCount = useMissionCount((state) => state.setCount);
	const { mutate } = useSWRConfig();

	function tabFilter(mission: Mission) {
		const date = dateFormat(mission.deadline_at);

		switch (tab) {
			case TabOption.TODAY:
				return isToday(date);
			case TabOption.UPCOMING:
				return isFuture(date) && !mission.is_completed;
			case TabOption.COMPLETED:
				return mission.is_completed;
			case TabOption.NOT_COMPLETED:
				return !mission.is_completed;
			default:
				return true;
		}
	}
	const [updatingMissions, setUpdatingMissions] = useState<Set<number>>(
		new Set(),
	);

	const filteredMissions = missions
		.filter(tabFilter)
		.filter((m) => m.title.toLowerCase().includes(searchText.toLowerCase()));

	async function toggleMission(id: number) {
		const mission = filteredMissions.find((m) => m.id === id);

		if (!mission) return;

		setUpdatingMissions((prev) => new Set(prev).add(id));
		const newCompletedState = !mission.is_completed;

		const supabase = browserClient();
		const { error } = await supabase
			.from("mission")
			.update({
				is_completed: newCompletedState,
				completed_at: newCompletedState ? new Date().toISOString() : null,
			})
			.eq("id", id);

		if (error) return;

		setUpdatingMissions((prev) => {
			const newSet = new Set(prev);
			newSet.delete(id);
			return newSet;
		});

		mutate("missions");
	}

	useEffect(() => {
		setMissionCount(filteredMissions.length);
	}, []);

	return (
		<div className="space-y-4">
			{filteredMissions.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<p className="text-muted-foreground">미션이 없습니다.</p>
				</div>
			) : (
				filteredMissions.map((mission) => (
					<MissionListItem
						key={`mission-item-${mission.id}`}
						mission={mission}
						onCheckedChange={() => toggleMission(mission.id)}
						isUpdating={updatingMissions.has(mission.id)}
						//onCheckedChange={() => toggleMission(mission.id)}
						//isUpdating={updatingMissions.has(mission.id)}
					/>
				))
			)}
		</div>
	);
}
