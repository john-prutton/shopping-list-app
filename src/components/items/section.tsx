import { AddIcon, EditIcon } from "@/lib/icons"
import { ActionDialog } from "../layout/action-dialog"
import { User } from "../members/section"
import { Section } from "../layout/section"
import { ItemCrudDialog } from "./crud-dialog"

export type Item = {
	name: string
	member: User
}
export function ItemSection({ items }: { items: Item[] }) {
	return (
		<Section title="Items" actionButton={<ItemCrudDialog />}>
			<div className="flex flex-col gap-2">
				{items.map((item, i) => (
					<div key={i} className="p-2 rounded-md border">
						<div className="flex flex-row items-center">
							<div
								style={{
									backgroundColor: item.member.color,
								}}
								className="mr-2 aspect-square w-8 rounded-md grid place-content-center"
							>
								{item.member.username.charAt(0)}
							</div>

							<p className="mr-auto">{item.name}</p>

							<ItemCrudDialog initalState={item} />
						</div>
					</div>
				))}
			</div>
		</Section>
	)
}
