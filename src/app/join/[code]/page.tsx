import Link from "next/link"

import { addUserToGroupByCode } from "@/lib/api/usersOnGroups/mutations"
import { getUserAuth } from "@/lib/auth/utils"
import type { GroupCode } from "@/lib/db/schema/groups"

import { AuthButton } from "@/components/auth/AuthButton"
import { Button } from "@/components/ui/button"

export default async function JoinGroupPage({
	params: { code },
}: {
	params: { code: GroupCode }
}) {
	const { session } = await getUserAuth()

	if (session) {
		const { error, group } = await addUserToGroupByCode(
			session.user.id,
			code
		)

		if (error)
			return (
				<main className="text-center">
					<h2 className="mb-8">
						There was an error while trying to join the group:
					</h2>
					<p>{error}</p>
				</main>
			)
		else
			return (
				<main className="text-center">
					<h2 className="mb-8">Group joined successfully!</h2>

					<div className="grid place-items-center">
						<Button asChild>
							<Link href={`/groups/${group!.id}`}>
								Go to group
							</Link>
						</Button>
					</div>
				</main>
			)
	} else
		return (
			<main>
				<h2 className="text-center mb-8">
					Sign in to join a group using code "{code.toUpperCase()}"
				</h2>
				<div className="grid place-items-center">
					<AuthButton />
				</div>
			</main>
		)
}
