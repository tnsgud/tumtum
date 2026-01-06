"use client";

import { useSearchTextStore } from "@/stores/search-text-store";
import { MissionListItem } from "./todo-list-item";
import { TabOption, Todo } from "./types";
import { dateFormat, isFuture, isToday } from "@/lib/date-utils";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useMissionCount } from "@/stores/mission-count-store";
import { getTodos, updateTodoCompleted } from "@/app/todo/actions";

type MissionListProps = {
	tab: TabOption;
};

export default function TodoList({ tab }: MissionListProps) {
	const searchText = useSearchTextStore((state) => state.searchText);
	const setTodoCount = useMissionCount((state) => state.setCount);
	const { data: todos, mutate } = useSWR("todos", getTodos);

	function tabFilter(mission: Todo) {
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
	const [updatingTodos, setUpdatingTodos] = useState<Set<number>>(new Set());

	const filteredTodos =
		todos
			?.filter(tabFilter)
			.filter((m) =>
				m.title.toLowerCase().includes(searchText.toLowerCase()),
			) ?? [];

	async function toggleTodo(id: number) {
		const mission = filteredTodos.find((m) => m.id === id);

		if (!mission) return;

		setUpdatingTodos((prev) => new Set(prev).add(id));

		const newCompletedState = !mission.is_completed;
		const completedAt = newCompletedState ? new Date().toISOString() : null;
		const data = await updateTodoCompleted({
			completed_at: completedAt,
			is_completed: newCompletedState,
			id: mission.id,
		});

		mutate();

		setUpdatingTodos((prev) => {
			const newSet = new Set(prev);
			newSet.delete(id);
			return newSet;
		});
	}

	useEffect(() => {
		setTodoCount(filteredTodos.length);
	}, []);

	return (
		<div className="space-y-4">
			{filteredTodos.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<p className="text-muted-foreground">할 일이 없습니다.</p>
				</div>
			) : (
				filteredTodos.map((mission) => (
					<MissionListItem
						key={`mission-item-${mission.id}`}
						mission={mission}
						onCheckedChange={() => toggleTodo(mission.id)}
						isUpdating={updatingTodos.has(mission.id)}
					/>
				))
			)}
		</div>
	);
}
