import { Tables } from "@/supabase";

// subjective_quiz로 만들게 아니라 quiz에서 유형을 구분하는 table로 분리하는게 좋을듯
/*export type SubQuiz = Pick<
	Tables<"subjective_quiz">,
	"id" | "question" | "explanation" | "answer"
> & { category: Pick<Tables<"todo_category">, "id" | "color" | "name"> };*/
export type Quest = {
	id: number;
	title: string;
	is_completed: boolean;
	href: string;
	category: {
		color: string;
		name: string;
	};
};
