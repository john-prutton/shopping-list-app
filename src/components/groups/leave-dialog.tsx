import { LeaveIcon } from "@/lib/icons"
import { ActionDialog } from "../layout/action-dialog"
import { Button } from "../ui/button"

export function LeaveGroupDialog() {
	return (
		<ActionDialog icon={<LeaveIcon size={20} className="text-red-400" />}>
			<div className="flex flex-col gap-2">
				<div>
					<p className="mb-2 font-semibold">Leave Group</p>
					<p className="mb-2 text-sm">
						Are you sure you want to leave this group?
					</p>

					<div className="flex flex-row gap-2">
						<Button variant={"secondary"} className="w-full">
							Cancel
						</Button>

						<Button variant={"destructive"} className="w-full">
							Leave
						</Button>
					</div>
				</div>
			</div>
		</ActionDialog>
	)
}
