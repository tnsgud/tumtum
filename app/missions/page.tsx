"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import AddTodoDialog from "@/components/mission/add-todo-dialog";
import { Search } from "lucide-react";
import { getMissionCount } from "./actions";
import { ChangeEvent, Suspense, useState } from "react";
import { FliterOption } from "@/components/mission/types";
import MissionList from "@/components/mission/mission-list";

// const MissionList = dynamic(() => import('@/components/mission/mission-list'), {
// });

export default function MissionsPage() {
	// const missionCount = await getMissionCount();
	const missionCount = 0;
	const [searchText, setSearchText] = useState("");

	const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<div className="space-y-6 max-sm:flex-1">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">미션 관리</h1>
					<p className="text-muted-foreground">
						나의 성장을 위한 미션을 관리해보세요.
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
						</div>
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								value={searchText}
								onChange={onSearchTextChange}
								placeholder="미션 검색..."
								className="w-full sm:w-[250px] pl-8"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="ALL">
						<TabsList className="mb-4">
							<TabsTrigger value="ALL">전체</TabsTrigger>
							<TabsTrigger value="TODAY">오늘</TabsTrigger>
							<TabsTrigger value="UPCOMING">예정</TabsTrigger>
							<TabsTrigger value="COMPLETED">완료</TabsTrigger>
							<TabsTrigger value="NOT_COMPLETED">미완료</TabsTrigger>
						</TabsList>
						{(Object.keys(FliterOption) as Array<keyof typeof FliterOption>)
							.slice(5, 10)
							.map((key) => (
								<TabsContent key={`${key}-tab-content`} value={key}>
									<Suspense>
										<MissionList
											fliterOption={FliterOption[key]}
											searchText={searchText}
										/>
									</Suspense>
								</TabsContent>
							))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
