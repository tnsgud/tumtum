"use client";

import { logout } from "@/app/login/actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
	const router = useRouter();

	const onClick = async () => {
		const { error } = await logout();
		if (error) {
			alert("문제가 발생했습니다. 관리자한테 문의해주세요.");
			return;
		}

		alert("로그아웃 되었습니다.");
		router.replace("/");
	};

	return (
		<Button variant={"outline"} onClick={onClick}>
			로그아웃
		</Button>
	);
};

export { SignOutButton };
