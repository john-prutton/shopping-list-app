"use client"

import { useRouter, usePathname } from "next/navigation"

import { LeaveIcon } from "@/lib/icons"
import { ActionDialog } from "@/components/layout/action-dialog"
import { Button } from "@/components/ui/button"
import { leaveGroupByGroupId } from "@/lib/api/groups/mutations"

export function LeaveGroupDialog() {
	const { refresh, push } = useRouter()
	const groupId = +usePathname().slice(1 + usePathname().lastIndexOf("/"))

	async function tryLeaveGroup() {
		const { error } = await leaveGroupByGroupId(groupId)
		if (error) {
			alert(
				`There was an error while trying to leave the group: ${error}`
			)
			return
		}

		// Otherwise, push user to groups page
		push("/groups")
		refresh()
	}

	return (
		<ActionDialog icon={<LeaveIcon size={20} className="text-red-400" />}>
			<div className="flex flex-col gap-2">
				<div>
					<p className="mb-2 font-semibold">Leave Group</p>
					<p className="mb-2 text-sm">
						Are you sure you want to leave this group?
					</p>

					<Button
						onClick={tryLeaveGroup}
						variant={"destructive"}
						className="w-full"
					>
						Leave
					</Button>
				</div>
			</div>
		</ActionDialog>
	)
}
