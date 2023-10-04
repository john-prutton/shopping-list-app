import { MemberSection } from "@/components/members/section"
import { ItemSection } from "@/components/items/section"
import { LeaveGroupDialog } from "@/components/groups/leave-dialog"
import { getGroupById } from "@/lib/api/groups/queries"
import { getGroupMembers } from "@/lib/api/usersOnGroups/queries"

export default async function GroupViewPage({
	params: { id },
}: {
	params: { id: number }
}) {
	const { error, group } = await getGroupById(id)

	if (error || !group) return <div>Error: {error}</div>

	const members = await getGroupMembers(id)

	return (
		<main>
			<div className="flex flex-row justify-between">
				<h1 className="mb-4 text-2xl font-bold underline underline-offset-4 text-gray-600">
					{group.name}
				</h1>

				<LeaveGroupDialog />
			</div>

			<MemberSection members={members} />

			{/* <ItemSection items={items} /> */}
		</main>
	)
}
