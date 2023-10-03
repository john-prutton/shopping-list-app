import { AddIcon } from "@/lib/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { ActionDialog } from "../layout/action-dialog"

export function CreateGroupDialog() {
	return (
		<ActionDialog icon={<AddIcon className="text-primary" />}>
			<div className="flex flex-col gap-2">
				<div>
					<p className="mb-2 font-semibold">Create new group</p>

					<div className="flex flex-row gap-2">
						<Input placeholder="Enter group name..." />

						<Button size={"icon"} className="aspect-square">
							<AddIcon />
						</Button>
					</div>
				</div>

				<div className="relative my-4 flex flex-row gap-2 justify-between items-center">
					<Separator className="w-1/3" />
					<p className="text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						OR
					</p>
					<Separator className="w-1/3" />
				</div>

				<div>
					<p className="mb-2 font-semibold">Join group</p>

					<div className="flex flex-row gap-2">
						<Input
							placeholder="Enter group code..."
							className="text-center"
						/>

						<Button size={"icon"} className="aspect-square">
							<AddIcon />
						</Button>
					</div>
				</div>
			</div>
		</ActionDialog>
	)
}
