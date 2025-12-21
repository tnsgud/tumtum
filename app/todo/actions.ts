import { Todo } from "@/components/todo/types";
import { browserClient } from "@/lib/supabase.browser";

const getTodos = async (): Promise<Todo[]> => {
	const supabase = browserClient();
	const { data } = await supabase
		.from("todo")
		.select(
			"id, title, deadline_at, is_completed, priority, category:todo_category(color, name)",
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (!data) return [];

	return data;
};

export { getTodos };
