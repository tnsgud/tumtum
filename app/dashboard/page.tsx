import { EmotionCheck } from "@/components/emotion-check";
import { GrowthGraph } from "@/components/growth-graph";
import { DailyQuests } from "@/components/quest/daily-quest-list";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serverClient } from "@/lib/supabase.server";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DailyQuestSkeleton } from "@/components/quest/daily-quest-skeleton";

export default async function Home() {
	const supabase = await serverClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		//  px-4
		<div className="container py-6 space-y-8">
			<section className="space-y-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							안녕하세요, {user?.user_metadata.display_name} 님 👋
						</h1>
						<p className="text-muted-foreground">
							오늘도 성장하는 하루를 만들어보세요.
						</p>
					</div>
					<Button className="bg-rose-500 hover:bg-rose-600 text-white">
						<Sparkles className="mr-2 h-4 w-4" />
						오늘의 미션 시작하기
					</Button>
				</div>
			</section>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card className="col-span-full md:col-span-1 lg:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="space-y-1">
							<CardTitle>일일 퀘스트</CardTitle>
						</div>
						<Link href="/quests">
							<Button variant="ghost" size="sm" className="gap-1">
								모두 보기
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</CardHeader>
					<CardContent>
						<Suspense fallback={<DailyQuestSkeleton />}>
							<DailyQuests />
						</Suspense>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10">
						<div className="space-y-1">
							<CardTitle>오늘의 감정</CardTitle>
							<CardDescription>지금 기분이 어떠신가요?</CardDescription>
						</div>
						<Link href="/retrospectives">
							<Button variant="ghost" size="sm" className="gap-1">
								작성하기
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</CardHeader>
					<CardContent>
						<EmotionCheck />
					</CardContent>
				</Card>

				<Card className="col-span-full">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="space-y-1">
							<CardTitle>성장 그래프</CardTitle>
							<CardDescription>지난 30일간의 성장 추이</CardDescription>
						</div>
						<Tabs defaultValue="missions">
							<TabsList>
								<TabsTrigger value="missions">미션</TabsTrigger>
								<TabsTrigger value="emotions">감정</TabsTrigger>
							</TabsList>
						</Tabs>
					</CardHeader>
					<CardContent>
						<GrowthGraph />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
