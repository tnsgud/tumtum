"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTodoDialog from "@/components/todo/add-todo-dialog";
import { TabOption } from "@/components/todo/types";
import MissionList from "@/components/todo/todo-list";
import { getTodos } from "./actions";
import { SearchInput } from "@/components/todo/search-input";
import useSWR from "swr";
import { useMissionCount } from "@/stores/mission-count-store";

export default function MissionsPage() {
	// server supabase로 실행 가능한지 확인하기
	const { data } = useSWR("missions", getTodos);
	const missionCount = useMissionCount((state) => state.count);

	return (
		<div className="space-y-6 max-sm:flex-1">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">텀투두</h1>
					<p className="text-muted-foreground">
						나의 성장을 위한 할 일을 관리해보세요.
					</p>
				</div>
				<AddTodoDialog />
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="space-y-1">
							<CardTitle>미션 리스트</CardTitle>
							<CardDescription>
								총 {missionCount}개의 미션이 있습니다.
							</CardDescription>
							<SearchInput />
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="TODAY">
						<TabsList className="mb-4">
							<TabsTrigger value="ALL">전체</TabsTrigger>
							<TabsTrigger value="TODAY">오늘</TabsTrigger>
							<TabsTrigger value="UPCOMING">예정</TabsTrigger>
							<TabsTrigger value="COMPLETED">완료</TabsTrigger>
							<TabsTrigger value="NOT_COMPLETED">미완료</TabsTrigger>
						</TabsList>
						{(Object.keys(TabOption) as Array<keyof typeof TabOption>)
							.slice(5, 10)
							.map((key) => (
								<TabsContent key={`${key}-tab-content`} value={key}>
									<MissionList todos={data ?? []} tab={TabOption[key]} />
								</TabsContent>
							))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
