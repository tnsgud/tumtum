import { Tables } from "supabase";

export type Todo = Pick<
	Tables<"todo">,
	"id" | "title" | "deadline_at" | "is_completed" | "priority"
> & { category: Pick<Tables<"todo_category">, "color" | "name"> };

export enum TabOption {
	ALL,
	TODAY,
	UPCOMING,
	COMPLETED,
	NOT_COMPLETED,
}
