"use client";

import { useSearchTextStore } from "@/stores/search-text-store";
import { MissionListItem } from "./mission-list-item";
import { TabOption, Mission } from "./types";
import { dateFormat, isFuture, isToday } from "@/lib/date-utils";
import { useState } from "react";
import { browserClient } from "@/lib/supabase.browser";

type MissionListProps = {
	missions: Mission[];
	tab: TabOption;
};

export default function MissionList({ missions, tab }: MissionListProps) {
	const { searchText } = useSearchTextStore();

	function textFilter(mission: Mission) {
		if (searchText === "") return true;

		return mission.title.includes(searchText);
	}

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

	/*const toggleMission = async (id: number) => {
		const mission = missions?.find((m) => m.id === id);
		if (!mission || updatingMissions.has(id)) return; // 이미 업데이트 중이면 무시

		const newCompletedState = !mission.is_completed;

		// 로딩 상태 추가
		setUpdatingMissions((prev) => new Set(prev).add(id));

		// Optimistic update: UI를 먼저 업데이트
		setMissions(
			missions?.map((mission) =>
				mission.id === id
					? { ...mission, is_completed: newCompletedState }
					: mission,
			),
		);

		// Supabase에 실제 업데이트
		try {
			const supabase = browserClient();
			const { error } = await supabase
				.from("mission")
				.update({
					is_completed: newCompletedState,
					completed_at: newCompletedState ? new Date().toISOString() : null,
				})
				.eq("id", id);

			if (error) {
				// 실패 시 원래 상태로 되돌리기
				setMissions(
					missions?.map((mission) =>
						mission.id === id
							? { ...mission, is_completed: !newCompletedState }
							: mission,
					),
				);
				console.error("미션 상태 업데이트 실패:", error);
			}
		} catch (error) {
			// 네트워크 오류 등으로 실패 시 원래 상태로 되돌리기
			setMissions(
				missions?.map((mission) =>
					mission.id === id
						? { ...mission, is_completed: !newCompletedState }
						: mission,
				),
			);
			console.error("미션 상태 업데이트 중 오류:", error);
		} finally {
			// 로딩 상태 제거
			setUpdatingMissions((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}
	};
	*/

	async function onChange(id: number) {
		const mission = missions.find((m) => m.id === id);

		if (!mission) return;

		const newCompletedState = !mission.is_completed;

		const supabase = browserClient();
		const { error } = await supabase
			.from("mission")
			.update({
				is_completed: newCompletedState,
				completed_at: newCompletedState ? new Date().toISOString() : null,
			})
			.eq("id", id);
	}

	const filteredMissions = missions.filter(tabFilter).filter(textFilter);

	return (
		<div className="space-y-4">
			{searchText}
			{filteredMissions.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<p className="text-muted-foreground">미션이 없습니다.</p>
				</div>
			) : (
				filteredMissions.map((mission) => (
					<MissionListItem
						key={`mission-item-${mission.id}`}
						mission={mission}
						onCheckedChange={() => onChange(mission.id)}
						isUpdating={false}
						//onCheckedChange={() => toggleMission(mission.id)}
						//isUpdating={updatingMissions.has(mission.id)}
					/>
				))
			)}
		</div>
	);
}
