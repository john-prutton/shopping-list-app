"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "../ui/button"

export function AuthButton({ className }: { className?: string }) {
	const { data: session, status } = useSession()

	if (status === "loading")
		return (
			<Button className={className ?? ""} variant={"secondary"}>
				Loading...
			</Button>
		)

	if (session) {
		return (
			<Button
				className={className ?? ""}
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
	return (
		<Button className={className ?? ""} onClick={() => signIn()}>
			Sign in
		</Button>
	)
}
