import { getItemsByGroup } from "@/lib/api/items/queries"
import { Section } from "../layout/section"
import { ItemCrudDialog } from "./crud-dialog"
import { GroupId } from "@/lib/db/schema/groups"

export async function ItemSection({ groupId }: { groupId: GroupId }) {
	const { error: getItemsError, items } = await getItemsByGroup(groupId)

	if (getItemsError)
		return (
			<>
				<p>There was an error getting the items:</p>
				<p>{getItemsError}</p>
			</>
		)
	else
		return (
			<Section title="Items" actionButton={<ItemCrudDialog />}>
				{!items || items.length === 0 ? (
					<p className="text-center">No items yet!</p>
				) : (
					items.map((item, i) => (
						<div key={i} className="p-2 rounded-md border">
							<div className="flex flex-row items-center">
								<div
									style={{
										backgroundColor: item.member
											? item.member.color
											: "grey",
									}}
									className="mr-2 aspect-square w-8 rounded-md grid place-content-center"
								>
									{item.member
										? item.member.name.charAt(0)
										: "?"}
								</div>

								<p className="mr-auto">{item.name}</p>

								<ItemCrudDialog initalState={item} />
							</div>
						</div>
					))
				)}
			</Section>
		)
}
