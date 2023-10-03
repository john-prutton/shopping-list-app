import { AddIcon, EditIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"

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
			<Section
				title="Groups"
				actionButton={
					<Button variant={"ghost"} size={"icon"}>
						<AddIcon className="text-primary" />
					</Button>
				}
			>
				<div className="flex flex-col gap-2">
					{groups.map((group, i) => (
						<div
							key={i}
							className="p-2 shadow border-border border rounded-md flex flex-row justify-between items-center"
						>
							<p className="text-xl">{group.name}</p>
							<Button variant={"ghost"} size={"icon"}>
								<EditIcon size={16} />
							</Button>
						</div>
					))}
				</div>
			</Section>
		</main>
	)
}
