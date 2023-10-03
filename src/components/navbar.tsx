"use client"

import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"

export function Navbar() {
	return (
		<nav className="flex flex-row justify-between items-center px-4 py-8 w-full bg-card rounded-md h-12 drop-shadow-xl">
			<p className="font-bold text-2xl text-gray-600">
				Shop
				<span className="text-primary">Ease</span>
			</p>

			<Button variant={"outline"} size={"icon"}>
				<MenuIcon />
			</Button>
		</nav>
	)
}
