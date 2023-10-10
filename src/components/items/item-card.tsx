"use client"

import { useRouter } from "next/navigation"

import { Item } from "@/lib/db/schema/items"
import { MarkCompleteIcon } from "@/components/icons"
import { deleteItem } from "@/lib/api/items/mutations"

import { Button } from "@/components/ui/button"

export function ItemCard({
	item,
	groupName,
}: {
	item: Item
	groupName: string
}) {
	const { refresh } = useRouter()

	async function tryMarkComplete() {
		const { error: deleteItemError } = await deleteItem(item.id)

		if (deleteItemError)
			alert(`There was an error deleting the item: ${deleteItemError}`)
		else {
			refresh()
		}
	}

	return (
		<div className="flex flex-row items-center p-4 rounded-md shadow bg-secondary text-secondary-foreground">
			<p className="text-xl font-semibold">{item.name}</p>
			<p className="text-md italic ml-2">{groupName}</p>

			<Button
				onClick={tryMarkComplete}
				variant={"secondary"}
				className="ml-auto text-primary"
			>
				<MarkCompleteIcon />
			</Button>
		</div>
	)
}
