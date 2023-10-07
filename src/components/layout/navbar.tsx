import Link from "next/link"

import { MenuIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { AuthButton } from "@/components/auth/AuthButton"
import { Logo } from "@/components/layout/logo"
import { Profile } from "@/components/profile"

export function Navbar() {
	return (
		<nav className="flex flex-row justify-between items-center px-4 py-8 w-full bg-card rounded-md h-12 drop-shadow-xl mb-8">
			<Link href={"/"}>
				<Logo />
			</Link>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant={"ghost"} size={"icon"}>
						<MenuIcon />
					</Button>
				</SheetTrigger>

				<SheetContent>
					<SheetHeader>
						<Profile />
					</SheetHeader>

					<div className="grid gap-4 py-4">
						<AuthButton />
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	)
}
