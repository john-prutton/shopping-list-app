import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ActionDialog({
	icon,
	children,
	isOpen,
	onOpenChange,
}: {
	icon: React.ReactNode
	children: React.ReactNode
	isOpen?: boolean
	onOpenChange?: (b: boolean) => void
}) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
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
