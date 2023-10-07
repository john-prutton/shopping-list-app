import Link from "next/link"

import { getGroupsByUserId } from "@/lib/api/groups/queries"

import { CreateGroupDialog } from "@/components/groups/create-dialog"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

export async function GroupSection() {
	const { groups } = await getGroupsByUserId()

	return (
		<Section title="Groups" actionButton={<CreateGroupDialog />}>
			{!groups || groups.length === 0 ? (
				<p className="text-center">
					You&apos;re not in any groups yet.
				</p>
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
