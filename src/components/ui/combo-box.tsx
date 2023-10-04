"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

const members = [
	{
		value: "mathew",
		label: "Mathew",
	},
	{
		value: "john",
		label: "John",
	},
]

export function Combobox({ initialValue }: { initialValue?: string }) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(initialValue ?? "")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? members.find((member) => member.value === value)
								?.label
						: "Select member..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search member..." />
					<CommandEmpty>No member found.</CommandEmpty>
					<CommandGroup>
						{members.map((member) => (
							<CommandItem
								key={member.value}
								onSelect={(currentValue: string) => {
									setValue(
										currentValue === value
											? ""
											: currentValue
									)
									setOpen(false)
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === member.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{member.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
