import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Combobox } from "../ui/combo-box"

import { ActionDialog } from "../layout/action-dialog"
import { AddIcon, EditIcon } from "@/lib/icons"
import { getItemsByGroup } from "@/lib/api/items/queries"

export function ItemCrudDialog({
	initalState,
}: {
	initalState?: NonNullable<
		Awaited<ReturnType<typeof getItemsByGroup>>["items"]
	>[0]
}) {
	return (
		<ActionDialog
			icon={
				initalState ? (
					<EditIcon size={20} className="text-gray-500" />
				) : (
					<AddIcon className="text-primary" />
				)
			}
		>
			<div className="flex flex-col gap-2">
				<div>
					<p className="mb-2 font-semibold">
						{initalState ? "Update item" : "Create new item"}
					</p>

					<div className="flex flex-col gap-2">
						<div>
							<p>Item Name</p>
							<Input
								placeholder="Enter item name..."
								value={initalState ? initalState.name : ""}
							/>
						</div>

						<div>
							<p>Assigned group member</p>
							<Combobox
								initialValue={initalState?.member?.name.toLowerCase()}
							/>
						</div>

						<div className="flex flex-row gap-2 mt-4">
							<Button className="w-full">
								{initalState ? "Update" : "Create"}
							</Button>

							{initalState ? (
								<Button
									variant={"destructive"}
									className="w-full"
								>
									Delete
								</Button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</ActionDialog>
	)
}
