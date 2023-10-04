"use client"

import { CopyIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { GroupCode } from "@/lib/db/schema/groups"

export function InviteMembersForm({ groupCode }: { groupCode: GroupCode }) {
	const joinLink = `http://localhost:3000/join/${groupCode}`

	async function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text)
	}

	return (
		<div className="flex flex-col gap-2">
			<div>
				<p className="mb-2 font-semibold">Invite by link</p>

				<div className="flex flex-row gap-2">
					<Input
						value={`http://shopease.com/join/${groupCode}`}
						contentEditable={false}
					/>

					<Button
						onClick={() => copyToClipboard(joinLink)}
						size={"icon"}
						className="aspect-square"
					>
						<CopyIcon />
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
				<p className="mb-2 font-semibold">Invite by code</p>

				<div className="flex flex-row gap-2">
					<Input
						value={groupCode}
						contentEditable={false}
						className="text-center"
					/>

					<Button
						onClick={() => copyToClipboard(groupCode)}
						size={"icon"}
						className="aspect-square"
					>
						<CopyIcon />
					</Button>
				</div>
			</div>
		</div>
	)
}
