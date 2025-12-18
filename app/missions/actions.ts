import { browserClient } from "@/lib/supabase.browser";

const getMissions = async () => {
	const supabase = browserClient();
	const { data } = await supabase
		.from("mission")
		.select(
			"id, title, deadline_at, is_completed, priority, category(color, name)",
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (!data) return [];

	return data;
};

export { getMissions };
