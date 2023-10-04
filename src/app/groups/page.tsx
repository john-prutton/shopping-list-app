import { GroupSection } from "@/components/groups/section"
import { getGroupsByUserId } from "@/lib/api/groups/queries"

export default async function Home() {
	const { groups } = await getGroupsByUserId()

	return (
		<main>
			<GroupSection groups={groups ?? []} />
		</main>
	)
}
