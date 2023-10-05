"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Combobox } from "../ui/combo-box"

import { ActionDialog } from "../layout/action-dialog"
import { AddIcon, EditIcon } from "@/lib/icons"
import type { getGroupMembers } from "@/lib/api/usersOnGroups/queries"
import { useState } from "react"

export function ItemCrudDialog({
	initalState,
	members,
}: {
	members: Awaited<ReturnType<typeof getGroupMembers>>
	initalState?: {
		id?: number
		name: string
		member?: { id: string; name: string; color: string }
	}
}) {
	const [state, setState] = useState<NonNullable<typeof initalState>>(
		initalState ?? {
			name: "New Item",
		}
	)

	const [isOpen, setIsOpen] = useState(false)

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

	const tryCreate = () => {
		setIsOpen(false)
	}

	const tryDelete = () => {
		setIsOpen(false)
	}

	const handlePrematureClose = (b: boolean) => {
		const isClosing = !b

		if (isClosing)
			setState(
				initalState ?? {
					name: "New Item",
				}
			)

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
							value={state?.member?.id ?? ""}
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
