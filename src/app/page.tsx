import Link from "next/link"

import { Section } from "@/components/layout/section"

import { Button } from "@/components/ui/button"
import { LeaveGroupDialog } from "@/components/groups/leave-dialog"
import { CreateGroupDialog } from "@/components/groups/create-dialog"

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
			<Section title="Groups" actionButton={<CreateGroupDialog />}>
				<div className="flex flex-col gap-2">
					{groups.map((group, i) => (
						<div
							key={i}
							className="rounded-md border flex flex-row justify-between items-center"
						>
							<Button
								asChild
								variant={"ghost"}
								className="w-full text-xl justify-start font-normal rounded-md"
							>
								<Link href={`/groups/${group.name}`}>
									{group.name}
								</Link>
							</Button>

							<LeaveGroupDialog />
						</div>
					))}
				</div>
			</Section>
		</main>
	)
}
