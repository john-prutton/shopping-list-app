export function Section({
	title,
	actionButton,
	children,
}: {
	title: string
	actionButton: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<section>
			<div className="flex flex-row justify-between items-center mb-1">
				<h2>{title}</h2>

				{actionButton}
			</div>

			{children}
		</section>
	)
}
