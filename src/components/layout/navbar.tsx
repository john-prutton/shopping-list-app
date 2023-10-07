import Link from "next/link"

import { MenuIcon } from "@/lib/icons"
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
import { getUserAuth } from "@/lib/auth/utils"
import Image from "next/image"

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
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<div className="grid gap-4 py-4">
						<Profile />
						<AuthButton />
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	)
}

async function Profile() {
	const { session } = await getUserAuth()

	if (!session) return null

	return (
		<div>
			<Image
				src={session.user.image ?? ""}
				alt="User's profile image"
				width={96}
				height={96}
				className="mx-auto rounded-md"
			/>
		</div>
	)
}
