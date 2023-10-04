import Link from "next/link"

import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

import { CreateGroupDialog } from "@/components/groups/create-dialog"
import { Group } from "@/lib/db/schema/groups"

export function GroupSection({ groups }: { groups: Group[] }) {
	return (
		<Section title="Groups" actionButton={<CreateGroupDialog />}>
			{groups.length === 0 ? (
				<p className="text-center">You're not in any groups yet.</p>
			) : (
				groups.map((group, i) => (
					<Button
						key={i}
						asChild
						variant={"outline"}
						className="w-full text-xl justify-start font-normal rounded-md"
					>
						<Link href={`/groups/${group.id}`}>{group.name}</Link>
					</Button>
				))
			)}
		</Section>
	)
}
