import Image from "next/image"
import { getProfileData } from "@/lib/api/profile-data/queries"

export async function Profile() {
	const { error, profilePicture, groups, items, userName } =
		await getProfileData()

	if (error)
		return (
			<div className="w-full aspect-video rounded-sm bg-gray-100 grid place-content-center">
				Unable to load profile data:
				<p className="text-center text-red-400 mt-4">{error}</p>
			</div>
		)

	return (
		<div className="flex flex-row gap-2">
			<Image
				src={profilePicture ?? ""}
				alt="User's profile image"
				width={96}
				height={96}
				className="mx-auto rounded-md"
			/>

			<div className="w-full text-start">
				<p className="font-semibold mb-1">{userName}</p>

				<p>
					<span className="font-bold">{groups}</span>{" "}
					{groups === 1 ? "group" : "groups"}
				</p>

				<p>
					<span className="font-bold">{items}</span>{" "}
					{items === 1 ? "item" : "items"}
				</p>
			</div>
		</div>
	)
}
