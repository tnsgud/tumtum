"use server";

import { Todo } from "@/components/todo/types";
import { serverClient } from "@/lib/supabase.server";

const selectColumns =
	"id, title, deadline_at, is_completed, priority, category:todo_category(color, name)";

const getTodos = async (): Promise<Todo[]> => {
	const supabase = await serverClient();
	const { data } = await supabase
		.from("todo")
		.select(selectColumns)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (!data) return [];

	return data;
};

async function updateTodoCompleted({
	completed_at,
	id,
	is_completed,
}: {
	completed_at: string | null;
	is_completed: boolean;
	id: number;
}) {
	const supabase = await serverClient();
	const { data, error } = await supabase
		.from("todo")
		.update({ completed_at, is_completed })
		.eq("id", id)
		.select(selectColumns);

	if (error) {
		throw error;
	}

	return data ?? [];
}

export { getTodos, updateTodoCompleted };
