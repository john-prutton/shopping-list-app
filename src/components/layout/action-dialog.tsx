import { AddIcon } from "@/lib/icons"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ActionDialog({
	icon,
	children,
}: {
	icon: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					{icon}
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-[80vw] rounded-md">
				{children}
			</DialogContent>
		</Dialog>
	)
}
