"use client"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import type { getGroupMembers } from "@/lib/api/usersOnGroups/queries"
import { Item, NewItem } from "@/lib/db/schema/items"
import { createItem, deleteItem, updateItem } from "@/lib/api/items/mutations"

import { AddIcon, EditIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combo-box"
import { ActionDialog } from "@/components/layout/action-dialog"

export function ItemCrudDialog({
	initalState,
	members,
}: {
	members: Awaited<ReturnType<typeof getGroupMembers>>
	initalState?: {
		id?: number
		groupId: number
		name: string
		memberId?: string
	}
}) {
	const { refresh: refreshPage } = useRouter()
	const groupId = usePathname().slice(1 + usePathname().lastIndexOf("/"))

	const [state, setState] = useState<NonNullable<typeof initalState>>(
		initalState ?? {
			name: "New Item",
			groupId: +groupId,
		}
	)

	const [isOpen, setIsOpen] = useState(false)

	const resetState = () =>
		setState(
			initalState ?? {
				name: "New Item",
				groupId: +groupId,
			}
		)

	const updateMember = (v: string) => {
		const newState = {
			...state,
			memberId: v,
		}

		setState(newState)
	}

	const updateName = (v: string) =>
		setState({
			...state,
			name: v,
		})

	const tryUpdate = async () => {
		const item = {
			id: state.id,
			groupId: state.groupId,
			userId: state.memberId,
			name: state.name,
		} as Item

		const { error: updateItemError } = await updateItem(item)

		if (updateItemError) {
			alert(`There was an error updating the item: ${updateItemError}`)
			return
		}

		setIsOpen(false)
		resetState()
		refreshPage()
	}

	const tryCreate = async () => {
		const newItem = {
			groupId: +groupId,
			name: state.name,
			userId: state.memberId,
		} as NewItem

		const { error: createItemError } = await createItem(newItem)

		if (createItemError) {
			alert(
				`There was an error while creating the item: ${createItemError}`
			)
			return
		}

		setIsOpen(false)
		resetState()
		refreshPage()
	}

	const tryDelete = async () => {
		const { error: itemDeleteError } = await deleteItem(state.id!, +groupId)

		if (itemDeleteError) {
			alert(
				`There was an error while deleting the item: ${itemDeleteError}`
			)
			return
		}

		setIsOpen(false)
		resetState()
		refreshPage()
	}

	const handlePrematureClose = (b: boolean) => {
		const isClosing = !b

		if (isClosing) resetState()

		setIsOpen(b)
	}

	return (
		<ActionDialog
			isOpen={isOpen}
			onOpenChange={handlePrematureClose}
			icon={
				initalState ? (
					<EditIcon size={20} className="text-gray-500" />
				) : (
					<AddIcon className="text-primary" />
				)
			}
		>
			<div>
				<p className="mb-2 font-semibold">
					{initalState ? "Update item" : "Create new item"}
				</p>

				<div className="flex flex-col gap-2">
					<div>
						<p>Item Name</p>
						<Input
							placeholder="Enter item name..."
							value={state.name}
							onChange={(e) => updateName(e.currentTarget.value)}
						/>
					</div>

					<div>
						<p>Assigned group member</p>

						<Combobox
							options={members.map((member) => ({
								label: member.name,
								value: member.id,
							}))}
							value={state.memberId ?? ""}
							setValue={updateMember}
						/>
					</div>

					<div className="flex flex-row gap-2 mt-4">
						<Button
							onClick={() =>
								initalState ? tryUpdate() : tryCreate()
							}
							className="w-full"
						>
							{initalState ? "Update" : "Create"}
						</Button>

						{initalState ? (
							<Button
								onClick={tryDelete}
								variant={"destructive"}
								className="w-full"
							>
								Delete
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</ActionDialog>
	)
}
