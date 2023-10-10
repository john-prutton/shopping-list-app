import { ItemCard } from "@/components/items/item-card"
import { getGroupsByUserId } from "@/lib/api/groups/queries"
import { getUserAuth } from "@/lib/auth/utils"

export default async function ShoppingListPage() {
	const { session } = await getUserAuth()

	const { error: getGroupsError, groups } = await getGroupsByUserId()
	if (getGroupsError || !groups)
		return (
			<p className="text-center">
				There was an error fetching groups: &quot;{getGroupsError}&quot;
			</p>
		)

	if (groups.length === 0)
		return <p className="text-center">You aren&apos;t in any groups!</p>

	const groupMap = new Map<number, string>(
		groups.map((group) => [group.id, group.name])
	)

	const allItems = groups
		.map((group) => group.items)
		.reduce((pv, v) => ({ ...pv, ...v }))

	if (allItems.length === 0)
		return (
			<p className="text-center">You don&apos;t have any items to buy!</p>
		)

	const assignedItems = allItems.filter(
		(item) => item.userId === session?.user.id
	)
	const unassignedItems = allItems.filter(
		(item) => item.userId !== session?.user.id
	)

	return (
		<div>
			{assignedItems.length > 0 ? (
				<>
					<h2>Assigned Items</h2>
					<div className="flex flex-col gap-2 my-4">
						{assignedItems.map((item, i) => (
							<ItemCard
								key={i}
								item={item}
								groupName={groupMap.get(item.groupId) ?? ""}
							/>
						))}
					</div>
				</>
			) : null}

			{unassignedItems.length > 0 ? (
				<>
					<h2>Unassigned Items</h2>
					<div className="flex flex-col gap-2 my-4">
						{unassignedItems.map((item, i) => (
							<ItemCard
								key={i}
								item={item}
								groupName={groupMap.get(item.groupId) ?? ""}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
