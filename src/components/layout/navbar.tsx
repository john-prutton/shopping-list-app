import Link from "next/link"
import Image from "next/image"

import { getProfileData } from "@/lib/api/profile-data/queries"
import { getUserAuth } from "@/lib/auth/utils"

import { AuthButton } from "@/components/auth/AuthButton"
import { Logo } from "@/components/layout/logo"
import { Profile } from "@/components/profile"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export async function Navbar() {
	const { session } = await getUserAuth()
	const { error: getProfileDataError, profilePicture } =
		await getProfileData()

	return (
		<nav className="flex flex-row justify-between items-center px-4 py-8 w-full bg-card rounded-md h-12 drop-shadow-xl mb-8">
			<Link href={"/"}>
				<Logo />
			</Link>

			{session && !getProfileDataError ? (
				<Popover>
					<PopoverTrigger>
						<Image
							src={profilePicture!}
							alt="User's profile picture"
							width={48}
							height={48}
							className="rounded-full"
						/>
					</PopoverTrigger>
					<PopoverContent asChild>
						<NavContent />
					</PopoverContent>
				</Popover>
			) : (
				<AuthButton />
			)}
		</nav>
	)
}

function NavContent() {
	return (
		<div className="flex flex-col gap-2">
			<Profile />
			<AuthButton />
			<Button asChild>
				<Link href={"/shopping-list"}>Create Shopping List</Link>
			</Button>
		</div>
	)
}
