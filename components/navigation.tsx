"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Home, ListTodo, PenLine, User, Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/stores/auth-store";
import { browserClient } from "@/lib/supabase.browser";
import { SignOutButton } from "./auth/sign-out-button";

export default function Navigation() {
	const pathname = usePathname();
	const isMobile = useMobile();
	const [isOpen, setIsOpen] = useState(false);
	const supabase = browserClient();
	const { isLoggined, setIsLoggined, setUser } = useAuthStore();

	const navItems = [
		{
			name: "홈",
			href: "/dashboard",
			icon: <Home className="h-5 w-5" />,
		},
		{
			name: "텀투두",
			href: "/todo",
			icon: <ListTodo className="h-5 w-5" />,
		},
		{
			name: "회고",
			href: "/retrospectives",
			icon: <PenLine className="h-5 w-5" />,
		},
		{
			name: "마이페이지",
			href: "/profile",
			icon: <User className="h-5 w-5" />,
		},
	];

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (
				(event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
				session !== null
			) {
				setIsLoggined(true);
				setUser(session.user);
			}
		});
	}, []);

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
				) : isMobile ? (
					<>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>

						{isOpen && (
							<div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 bg-background animate-in slide-in-from-bottom-80 md:hidden">
								<div className="relative z-20 grid gap-6 rounded-md p-4">
									<nav className="grid grid-flow-row auto-rows-max text-sm">
										{navItems.map((item) => (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-2 rounded-md px-3 py-4 text-base font-medium",
													pathname === item.href
														? "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
														: "hover:bg-muted",
												)}
												onClick={(e) => setIsOpen(false)}
											>
												{item.icon}
												{item.name}
											</Link>
										))}
									</nav>
									<div className="flex justify-end">
										<SignOutButton />
										<ModeToggle />
									</div>
								</div>
							</div>
						)}
					</>
				) : (
					<nav className="flex items-center gap-6">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex items-center gap-1 text-sm font-medium transition-colors hover:text-rose-600 dark:hover:text-rose-400",
									pathname === item.href
										? "text-rose-600 dark:text-rose-400"
										: "text-muted-foreground",
								)}
							>
								{item.icon}
								<span>{item.name}</span>
							</Link>
						))}
						<SignOutButton />
						<ModeToggle />
					</nav>
				)}
			</div>
		</header>
	);
}
