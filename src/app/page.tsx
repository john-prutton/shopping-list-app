import { AddIcon, LeaveIcon, LogOutIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import { ActionDialog } from "@/components/layout/action-dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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
					<ActionDialog icon={<AddIcon className="text-primary" />}>
						<div className="flex flex-col gap-2">
							<div>
								<p className="mb-2 font-semibold">
									Create new group
								</p>

								<div className="flex flex-row gap-2">
									<Input placeholder="Enter group name..." />

									<Button
										size={"icon"}
										className="aspect-square"
									>
										<AddIcon />
									</Button>
								</div>
							</div>

							<div className="relative my-4 flex flex-row gap-2 justify-between items-center">
								<Separator className="w-1/3" />
								<p className="text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
									OR
								</p>
								<Separator className="w-1/3" />
							</div>

							<div>
								<p className="mb-2 font-semibold">Join group</p>

								<div className="flex flex-row gap-2">
									<Input
										placeholder="Enter group code..."
										className="text-center"
									/>

									<Button
										size={"icon"}
										className="aspect-square"
									>
										<AddIcon />
									</Button>
								</div>
							</div>
						</div>
					</ActionDialog>
				}
			>
				<div className="flex flex-col gap-2">
					{groups.map((group, i) => (
						<div
							key={i}
							className="p-2 shadow border-border border rounded-md flex flex-row justify-between items-center"
						>
							<p className="text-xl">{group.name}</p>
							<ActionDialog
								icon={
									<LeaveIcon
										size={20}
										className="text-red-400"
									/>
								}
							>
								<div className="flex flex-col gap-2">
									<div>
										<p className="mb-2 font-semibold">
											Leave Group
										</p>
										<p className="mb-2 text-sm">
											Are you sure you want to leave this
											group?
										</p>

										<div className="flex flex-row gap-2">
											<Button
												variant={"secondary"}
												className="w-full"
											>
												Cancel
											</Button>

											<Button
												variant={"destructive"}
												className="w-full"
											>
												Leave
											</Button>
										</div>
									</div>
								</div>
							</ActionDialog>
						</div>
					))}
				</div>
			</Section>
		</main>
	)
}
