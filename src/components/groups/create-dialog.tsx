"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"

import { createGroup, joinGroup } from "@/lib/api/groups/mutations"

import { AddGroupIcon, AddIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ActionDialog } from "@/components/layout/action-dialog"

export function CreateGroupDialog() {
	const { push: redirectTo, refresh } = useRouter()
	const groupNameInputRef = useRef<HTMLInputElement | null>(null)
	const groupCodeInputRef = useRef<HTMLInputElement | null>(null)

	async function tryCreateGroup() {
		if (!groupNameInputRef.current) {
			alert("Error: component didn't render correctly")
			return
		}

		const groupName = groupNameInputRef.current.value

		if (groupName === "") {
			alert("No group name provided")
			return
		}

		// Try and create the group in the db
		const { error, group } = await createGroup({ name: groupName })

		if (error) {
			alert(`An error occured while creating the group: ${error}`)
			return
		}

		// Otherwise, redirect to the group
		refresh()
		redirectTo(`/groups/${group!.id}`)
	}

	async function tryJoinGroup() {
		if (!groupCodeInputRef.current) {
			alert("Error: component didn't render correctly")
			return
		}

		const groupCode = groupCodeInputRef.current.value

		if (groupCode === "") {
			alert("No group code provided")
			return
		}

		// Try and join the group in the db
		const { error, group } = await joinGroup(groupCode)

		if (error) {
			alert(`An error occured while creating the group: ${error}`)
			return
		}

		// Otherwise, redirect to the group
		refresh()
		redirectTo(`/groups/${group!.id}`)
	}

	return (
		<ActionDialog icon={<AddGroupIcon className="text-primary" />}>
			<div className="flex flex-col gap-2">
				<div>
					<p className="mb-2 font-semibold">Create new group</p>

					<div className="flex flex-row gap-2">
						<Input
							ref={groupNameInputRef}
							placeholder="Enter group name..."
						/>

						<Button
							onClick={tryCreateGroup}
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
							ref={groupCodeInputRef}
							placeholder="Enter group code..."
							className="text-center"
						/>

						<Button
							onClick={tryJoinGroup}
							size={"icon"}
							className="aspect-square"
						>
							<AddIcon />
						</Button>
					</div>
				</div>
			</div>
		</ActionDialog>
	)
}
