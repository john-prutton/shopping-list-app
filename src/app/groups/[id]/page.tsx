import { MemberSection } from "@/components/members/section"
import { ItemSection } from "@/components/items/section"
import { LeaveGroupDialog } from "@/components/groups/leave-dialog"

const generateRandomColor = () => `hsl(${Math.random() * 360}, 45%, 55%)`

export default function GroupViewPage({
	params: { id },
}: {
	params: { id: number }
}) {
	const groupName = "Test group"
	const members = [
		{ username: "Mathew", color: generateRandomColor() },
		{ username: "John", color: generateRandomColor() },
	]
	const items = [
		{ name: "Brocolli", member: members[0] },
		{ name: "Butter", member: members[1] },
	]

	return (
		<main>
			<div className="flex flex-row justify-between">
				<h1 className="mb-4 text-2xl font-bold underline underline-offset-4 text-gray-600">
					{groupName}
				</h1>

				<LeaveGroupDialog />
			</div>

			<MemberSection members={members} />

			<ItemSection items={items} />
		</main>
	)
}
