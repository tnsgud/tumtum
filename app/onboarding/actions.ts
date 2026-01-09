"use server";

import { serverClient } from "@/lib/supabase.server";
import { cache } from "react";
import { User } from "@supabase/supabase-js";

/**
 * true => 온보딩 진행완료
 * false => 온보딩 진행안함
 */
export async function onboardingCheck(user: User) {
	const supabase = await serverClient();
	const getOnboardingData = cache(
		async () =>
			await supabase
				.from("onboarding_check")
				.select("id")
				.eq("user_id", user.id),
	);
	const { data } = await getOnboardingData();

	return data?.length !== 0;
}
