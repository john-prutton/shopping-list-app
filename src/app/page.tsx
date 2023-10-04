import { GroupSection } from "@/components/groups/section"

export default function Home() {
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
			<GroupSection groups={groups} />
		</main>
	)
}
