"use client";
import * as React from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SWRConfig
			value={{
				onError: (err, key, con) => {
					console.log("err", err);
					console.log("key", key);
					console.log("con", con);
				},
				refreshInterval: 1000 * 60 * 5,
				revalidateOnMount: false,
			}}
		>
			{children}
		</SWRConfig>
	);
};
