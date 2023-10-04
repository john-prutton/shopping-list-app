import { GroupSection } from "@/components/groups/section"
import { getComputers } from "@/lib/api/computers/queries"

export default async function Home() {
	const { computers } = await getComputers()

	const groups = [
		{
			name: "test",
		},
		{
			name: "test-2",
		},
	]

	return (
		<main>
			{computers.map((c, i) => (
				<div key={i}>
					{c.brand} has {c.cores} cores.
				</div>
			))}
			<GroupSection groups={groups} />
		</main>
	)
}
