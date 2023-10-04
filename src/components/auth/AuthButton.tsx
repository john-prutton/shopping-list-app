"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "../ui/button"

export function AuthButton() {
	const { data: session, status } = useSession()

	if (status === "loading")
		return <Button variant={"secondary"}>Loading...</Button>

	if (session) {
		return (
			<Button
				variant={"destructive"}
				onClick={() =>
					signOut({
						callbackUrl: "/",
					})
				}
			>
				Sign out
			</Button>
		)
	}
	return <Button onClick={() => signIn()}>Sign in</Button>
}
