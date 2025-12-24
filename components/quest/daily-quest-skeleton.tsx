import { Skeleton } from "../ui/skeleton";

export function DailyQuestSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col space-y-2">
				<div className="flex justify-between">
					<Skeleton className="h-3 w-20" />
					<Skeleton className="h-3 w-20" />
				</div>
				<Skeleton className="h-2.5 w-full" />
			</div>
			<Skeleton className="h-4 w-full" />
		</div>
	);
}
