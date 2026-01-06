"use server";

import { serverClient } from "@/lib/supabase.server";
import { LoginFormSchema } from "./types";

export async function login({ email, password }: LoginFormSchema) {
	const supabase = await serverClient();
	return await supabase.auth.signInWithPassword({ email, password });
}

export async function logout() {
	const supabase = await serverClient();
	return await supabase.auth.signOut();
}
