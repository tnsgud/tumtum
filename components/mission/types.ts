import { Tables } from "supabase";

export type Mission = Pick<
	Tables<"mission">,
	"id" | "title" | "deadline_at" | "is_completed" | "priority"
> & { category: Pick<Tables<"category">, "color" | "name"> };
