import { AddIcon } from "@/lib/icons"
import { ActionDialog } from "../layout/action-dialog"
import { Section } from "../layout/section"
import { InviteMembersForm } from "./invite-form"

export type User = {
	username: string
	color: string
}

export function MemberSection({ members }: { members: User[] }) {
	return (
		<Section
			classname="mb-4"
			orientation="row"
			title="Members"
			actionButton={
				<ActionDialog icon={<AddIcon className="text-primary" />}>
					<InviteMembersForm />
				</ActionDialog>
			}
		>
			{members.map((member, i) => (
				<div
					key={i}
					style={{ backgroundColor: member.color }}
					className="w-14 aspect-square text-2xl font-light p-2 rounded-md grid place-content-center"
				>
					{member.username.charAt(0)}
				</div>
			))}
		</Section>
	)
}
