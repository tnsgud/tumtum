"use server";

import { Quest } from "@/components/quest/types";
import { serverClient } from "@/lib/supabase.server";

const getQuest = async (): Promise<{ quests: Quest[]; percent: number }> => {
	const supabase = await serverClient();

	// 이건 퀴즈를 뽑는 쿼리
	// const { error} = await supabase.from('subjective_quiz').select('id, question, explanation, answer, category:quiz_category(id, color, name)')

	const data: Quest[] = [
		{
			id: 1,
			title: "하루한퀴즈하기",
			is_completed: true,
			href: "/quests/1",
			category: {
				color: "#861657",
				name: "일일",
			},
		},
		{
			id: 2,
			title: "하루한퀴즈하기",
			is_completed: false,
			href: "/quests/1",
			category: {
				color: "#861657",
				name: "일일",
			},
		},
	];

	const percent =
		(100 * data.filter((q) => q.is_completed).length) / data.length;

	// if(error || !data) return []

	return { quests: data, percent };
};

export { getQuest };
