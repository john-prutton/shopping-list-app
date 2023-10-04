import SignIn from "@/components/auth/SignIn"
import { GroupSection } from "@/components/groups/section"
import { getGroups } from "@/lib/api/groups/queries"

export default async function Home() {
	const { groups } = await getGroups()

	return (
		<main>
			<SignIn />
			<GroupSection groups={groups} />
		</main>
	)
}
