import Link from "next/link"

import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

import { CreateGroupDialog } from "@/components/groups/create-dialog"

export type Group = {
	name: string
}

export function GroupSection({ groups }: { groups: Group[] }) {
	return (
		<Section title="Groups" actionButton={<CreateGroupDialog />}>
			{groups.map((group, i) => (
				<Button
					key={i}
					asChild
					variant={"outline"}
					className="w-full text-xl justify-start font-normal rounded-md"
				>
					<Link href={`/groups/${group.name}`}>{group.name}</Link>
				</Button>
			))}
		</Section>
	)
}
