"use client";

import { useSearchTextStore } from "@/stores/search-text-store";
import { MissionListItem } from "./mission-list-item";
import { TabOption, Mission } from "./types";
import { dateFormat, isFuture, isToday } from "@/lib/date-utils";
import { useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase.browser";

type MissionListProps = {
	missions: Mission[];
	tab: TabOption;
};

export default function MissionList({ missions, tab }: MissionListProps) {
	/*
		TODO
			router.refresh는 client state를 변경해주지 않고 페이지를 다시 불러옴 
			그렇기에 지금 데이터가 넘어오는건 최신 데이터이지만 반영되지 않음
			반영시키고 싶으면 zustand에 넣어서 데이터를 전역으로 관리하던가
			아니면 window.location.reload()를 사용하던가 해야함

			1. zustand를 사용한다
				데이터는 server에서 받아오기에 이걸 현재 component에서 변경하게 된다면
				useEffect를 사용해서 변경할텐데 그럼 변경이 일어나니 다시 useEffect가 발동하게 되고
				무한 굴레에 들어가게 되는거 아닌가?하는 생각이 든다

			2. window.location.reload를 사용한다
				진짜 싫다 next를 사용하지말고 그냥 react를 사용하는게 백배 더 좋을거 같다.
				
			좀 생각해봐야 할 듯
			1번이 정배다. 라는 생각이 강하게 들지만 방법이 있을지 고민을 해봐야 겠다.
			대충 검색해본 결과 병렬 페이징을 이용해서 modal과 component를 분리해서
			데이터를 변경하는 방법도 있다고 한것 같은데 정확히 찾아보지 않아서 내 문제의 해결 방안인지 잘 모르겟다.
			
	*/

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
	const [filteredMissions, setFilteredMissions] = useState(
		missions.filter(tabFilter),
	);

	useEffect(() => {
		setFilteredMissions(missions.filter(tabFilter));
	}, [missions]);

	useEffect(() => {
		setFilteredMissions(missions.filter(tabFilter).filter(textFilter));
	}, [searchText]);

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

		setFilteredMissions((prev) =>
			prev.map((m) =>
				m.id === id ? { ...m, is_completed: newCompletedState } : m,
			),
		);
		setUpdatingMissions((prev) => {
			const newSet = new Set(prev);
			newSet.delete(id);
			return newSet;
		});
	}

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
