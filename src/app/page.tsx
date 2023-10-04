import Link from "next/link"

import { Section } from "@/components/layout/section"

import { Button } from "@/components/ui/button"
import { LeaveGroupDialog } from "@/components/groups/leave-dialog"
import { CreateGroupDialog } from "@/components/groups/create-dialog"
import { GroupSection } from "@/components/groups/section"

export default function Home() {
	const groups = [
		{
			name: "test",
		},
		{
			name: "test-2",
		},
	]

	return (
		<main>
			<GroupSection groups={groups} />
		</main>
	)
}
