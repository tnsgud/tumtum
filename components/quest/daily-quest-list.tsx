"use client";

import useSWR from "swr";
import { Progress } from "@/components/ui/progress";
import { getQuest } from "@/app/quests/actions";
import { DailyQuestListItem } from "./daily-quest-list-item";

export function DailyQuests() {
	const { data } = useSWR("quests", getQuest, {
		suspense: true,
		fallbackData: { quests: [], percent: 0 },
	});

	if (!data) {
		throw new Error("data is undefined");
	}

	const { quests, percent } = data;

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>진행률: {percent}%</span>
					<span>
						{quests.length * percent * 0.01}/{quests.length} 완료
					</span>
				</div>
				<Progress value={percent} className="h-2" />
			</div>

			<div className="space-y-3">
				{quests.length === 0 ? (
					<div>등록된 퀘스트가 없습니다.</div>
				) : (
					quests.map((quest) => (
						<DailyQuestListItem key={`daily-quest-${quest.id}`} quest={quest} />
					))
				)}
			</div>
		</div>
	);
}
