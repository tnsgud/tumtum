"use client";

import { Home, ListTodo, Menu, PenLine, User, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOutButton } from "../auth/sign-out-button";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

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
	const isMobile = useMobile();

	return isMobile ? (
		<>
			<Button
				variant="ghost"
				size="icon"
				className="md:hidden"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle menu"
			>
				{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
	);
}
