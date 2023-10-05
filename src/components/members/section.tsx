import { getGroupMembers } from "@/lib/api/usersOnGroups/queries"
import type { Group } from "@/lib/db/schema/groups"

import { AddIcon } from "@/lib/icons"
import { ActionDialog } from "../layout/action-dialog"
import { Section } from "../layout/section"
import { InviteMembersForm } from "./invite-form"

export async function MemberSection({ group }: { group: Group }) {
	const members = await getGroupMembers(group.id)

	return (
		<Section
			classname="mb-4"
			orientation="row"
			title="Members"
			actionButton={
				<ActionDialog icon={<AddIcon className="text-primary" />}>
					<InviteMembersForm groupCode={group.code.toUpperCase()} />
				</ActionDialog>
			}
		>
			{members.map((member, i) => (
				<div
					key={i}
					style={{ backgroundColor: member.color }}
					className="w-14 aspect-square text-2xl font-light p-2 rounded-md grid place-content-center"
				>
					{member.name.charAt(0)}
				</div>
			))}
		</Section>
	)
}
