"use client";

import { useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase.browser";
import { MissionListItem } from "./mission-list-item";
import { dateFormat } from "@/lib/date-utils";
import { FliterOption, Mission } from "./types";
import { useMissionStore } from "@/stores/mission-store";
import useSWR from "swr";
import { isFuture, isToday } from "date-fns";

type MissionListProps = {
	fliterOption: FliterOption;
	searchText: string;
};

const getMissions = async () => {
	const supabase = browserClient();
	const { data, error } = await supabase
		.from("mission")
		.select(
			"id, title, deadline_at, is_completed, priority, category(color, name)",
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (error) throw new Error(error.message);

	return data ?? [];
};

function optionFilter(m: Mission, fliterOption: FliterOption) {
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

function titleFilter(title: string, searchText: string) {
	return title.includes(searchText);
}

export default function MissionList({
	fliterOption,
	searchText,
}: MissionListProps) {
	const { data } = useSWR("missions", getMissions, {
		suspense: true,
		fallbackData: [],
	});
	const [missions, setMissions] = useState(
		data
			.filter(({ title }) => titleFilter(title, searchText))
			.filter((m) => optionFilter(m, fliterOption)),
	); // UI 업데이트 용 실제로 사용 X
	const [updatingMissions, setUpdatingMissions] = useState<Set<number>>(
		new Set(),
	);

	const toggleMission = async (id: number) => {
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

	return (
		<div className="space-y-4">
			{missions.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<p className="text-muted-foreground">미션이 없습니다.</p>
				</div>
			) : (
				missions.map((mission) => (
					<MissionListItem
						key={`mission-item-${mission.id}`}
						onCheckedChange={() => toggleMission(mission.id)}
						mission={mission}
						isUpdating={updatingMissions.has(mission.id)}
					/>
				))
			)}
		</div>
	);
}
