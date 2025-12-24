import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getTextColorFromBackground } from "@/lib/ui-utils";
import { Quest } from "./types";
import Link from "next/link";

interface Props {
	quest: Quest;
}

function DailyQuestListItem({ quest }: Props) {
	return (
		<div
			className={cn(
				"flex items-center space-x-3 rounded-lg border p-3 transition-colors",
				quest.is_completed
					? "border-muted bg-muted/50"
					: "border-border hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-800 dark:hover:bg-rose-950/30",
			)}
		>
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between">
					<div className="flex space-x-2">
						<p
							className={cn(
								"font-medium",
								quest.is_completed && "text-muted-foreground line-through",
							)}
						>
							{quest.title}
						</p>
						<Badge
							variant="outline"
							style={{
								["--bg-color" as any]: quest.category.color,
							}}
							className={cn("flex items-center gap-1 bg-[var(--bg-color)]")}
						>
							<span
								className={`text-xs ${getTextColorFromBackground(
									quest.category.color,
								)}`}
							>
								{quest.category.name}
							</span>
						</Badge>
					</div>

					<Link href={`${quest.href}`}>
						<ArrowRight className="h-4" />
					</Link>
				</div>
			</div>
		</div>
	);
}

export { DailyQuestListItem };
