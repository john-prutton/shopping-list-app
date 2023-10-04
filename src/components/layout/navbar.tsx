"use client"

import { AddIcon, LogOutIcon, MenuIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

export function Navbar() {
	return (
		<nav className="flex flex-row justify-between items-center px-4 py-8 w-full bg-card rounded-md h-12 drop-shadow-xl mb-8">
			<Link href={"/"}>
				<p className="font-bold text-2xl text-gray-600">
					Shop
					<span className="text-primary">Ease</span>
				</p>
			</Link>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant={"ghost"} size={"icon"}>
						<MenuIcon />
					</Button>
				</SheetTrigger>

				<SheetContent>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<div className="grid gap-4 py-4">
						<Button variant={"secondary"}>
							<AddIcon className="mr-2" size={16} />
							Create Group
						</Button>

						<Button variant={"secondary"}>
							<LogOutIcon className="mr-2" size={16} />
							Sign Out
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	)
}
