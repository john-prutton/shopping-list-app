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
						variant={"secondary"}
						size={"lg"}
						asChild
						className="shadow-md w-full text-xl flex-row justify-between font-normal rounded-md p-8"
					>
						<Link href={`/groups/${group.id}`}>
							<p className="font-semibold">{group.name}</p>
							<p className="text-sm">
								{group.items.length} items
							</p>
						</Link>
					</Button>
				))
			)}
		</Section>
	)
}
