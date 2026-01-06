import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "./navigation";
import { userLoginCheck } from "@/app/auth/actions";

export default async function Header() {
	const isLoggined = await userLoginCheck();

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="w-full px-6 flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<span className="text-xl font-bold text-rose-500 dark:text-rose-400">
							텀텀
						</span>
						<span className="hidden text-lg font-medium sm:inline-block">
							TumTum
						</span>
					</Link>
				</div>

				{!isLoggined ? (
					<div className="flex items-center gap-2">
						<Link href="/login">
							<Button variant="ghost">로그인</Button>
						</Link>
						<Link href="/signup">
							<Button className="bg-rose-500 hover:bg-rose-600 text-white">
								회원가입
							</Button>
						</Link>
					</div>
				) : (
					<Navigation />
				)}
			</div>
		</header>
	);
}
