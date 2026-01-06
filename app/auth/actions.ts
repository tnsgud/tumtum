"use server";

import { serverClient } from "@/lib/supabase.server";

export async function getUser() {
	const supabase = await serverClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		console.log(error);
		throw error;
	}

	return user;
}

export async function userLoginCheck(): Promise<boolean> {
	const user = await getUser();

	return user !== null;
}
