import { redirect } from "next/navigation"

import { getUserAuth } from "@/lib/auth/utils"

import { AuthButton } from "@/components/auth/AuthButton"
import { Logo } from "@/components/layout/logo"

export default async function Home() {
	const { session } = await getUserAuth()
	if (session) redirect("/groups")

	return (
		<main>
			<h1 className="text-center">
				Welcome to <Logo />
			</h1>

			<div className="grid place-content-center h-[50vh]">
				<AuthButton />
			</div>
		</main>
	)
}
