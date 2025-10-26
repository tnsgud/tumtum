"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { browserClient } from "@/lib/supabase.browser";
import { Tables } from "@/supabase";

type Emotion = Pick<
	Tables<"emotion">,
	"name" | "emoji" | "default_color" | "dark_mode_color"
>;

export function EmotionCheck() {
	const supabase = browserClient();
	const [emotions, setEmotions] = useState<Emotion[]>([]);
	const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
	const [note, setNote] = useState("");

	useEffect(() => {
		async function fetchData() {
			const { data } = await supabase
				.from("emotion")
				.select("name,emoji,default_color,dark_mode_color");

			setEmotions(data ?? []);
		}

		fetchData();
	}, []);

	const handleSubmit = async () => {};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-3 gap-2">
				{emotions.map((emotion) => (
					<Button
						key={`emotion-${emotion.name}`}
						variant="outline"
						className={cn(
							"flex h-auto flex-col gap-1 p-3",
							selectedEmotion === emotion.name &&
								"border-2 border-rose-500 dark:border-rose-400",
							`${emotion.default_color} dark:${emotion.dark_mode_color}`,
						)}
						onClick={() => setSelectedEmotion(emotion.name)}
					>
						<span className="text-2xl">{emotion.emoji}</span>
						<span className="text-xs font-normal">{emotion.name}</span>
					</Button>
				))}
			</div>

			<Textarea
				placeholder="오늘 기분이 어떤지 간단히 적어보세요..."
				className="h-20 resize-none"
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>

			<Button
				className="w-full bg-rose-500 hover:bg-rose-600 text-white"
				disabled={!selectedEmotion || note.trim() === ""}
				onClick={handleSubmit}
			>
				감정 기록하기
			</Button>
		</div>
	);
}
