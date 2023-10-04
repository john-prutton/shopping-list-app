import { GroupSection } from "@/components/groups/section"
import { getGroups } from "@/lib/api/groups/queries"

export default async function Home() {
	const { groups } = await getGroups()

	return (
		<main>
			<GroupSection groups={groups} />
		</main>
	)
}
