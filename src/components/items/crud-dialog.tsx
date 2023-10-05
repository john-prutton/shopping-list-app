"use client"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import type { getGroupMembers } from "@/lib/api/usersOnGroups/queries"
import { NewItem } from "@/lib/db/schema/items"
import { createItem, deleteItem } from "@/lib/api/items/mutations"

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
		name: string
		memberId?: string
	}
}) {
	const { refresh: refreshPage } = useRouter()
	const groupId = usePathname().slice(1 + usePathname().lastIndexOf("/"))

	const [state, setState] = useState<NonNullable<typeof initalState>>(
		initalState ?? {
			name: "New Item",
		}
	)

	const [isOpen, setIsOpen] = useState(false)

	const resetState = () =>
		setState(
			initalState ?? {
				name: "New Item",
			}
		)

	const updateMember = (v: string) => {
		const newState = {
			...state,
			member: members.find((m) => m.id === v),
		}

		setState(newState)
	}

	const updateName = (v: string) =>
		setState({
			...state,
			name: v,
		})

	const tryUpdate = () => {
		setIsOpen(false)
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

		refreshPage()
		setIsOpen(false)
		resetState()
	}

	const tryDelete = async () => {
		const { error: itemDeleteError } = await deleteItem(state.id!, +groupId)

		if (itemDeleteError) {
			alert(
				`There was an error while deleting the item: ${itemDeleteError}`
			)
			return
		}

		resetState()
		setIsOpen(false)
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
							value={state?.memberId ?? ""}
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
