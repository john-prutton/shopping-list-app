import { cn } from "@/lib/utils"

export function Section({
	title,
	actionButton,
	children,
	classname,
	orientation = "col",
}: {
	orientation?: "row" | "col"
	classname?: string
	title: string
	actionButton: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<section className={cn(classname)}>
			<div className="flex flex-row justify-between items-center mb-1">
				<h2>{title}</h2>

				{actionButton}
			</div>

			<div
				className={cn(
					"flex gap-2",
					orientation === "row" ? "flex-row" : "flex-col"
				)}
			>
				{children}
			</div>
		</section>
	)
}
