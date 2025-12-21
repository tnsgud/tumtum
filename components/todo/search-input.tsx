"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useSearchTextStore } from "@/stores/search-text-store";
import { useState, ChangeEvent, useEffect } from "react";

const DELAY = 250;

function SearchInput() {
	const [text, setText] = useState("");
	const setSearchText = useSearchTextStore((state) => state.setSearchText);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchText(text);
		}, DELAY);

		return () => clearTimeout(timer);
	}, [text]);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setText(e.target.value);
	}

	return (
		<div className="relative">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="미션 검색..."
				className="w-full sm:w-[250px] pl-8"
				value={text}
				onChange={onChange}
			/>
		</div>
	);
}

export { SearchInput };
