import { serverClient } from "@/lib/supabase.server";

const getMissions = async () => {
	const supabase = await serverClient();
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
