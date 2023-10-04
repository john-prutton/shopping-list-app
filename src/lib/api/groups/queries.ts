import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { groupIdSchema, groups, GroupId } from "@/lib/db/schema/groups"
import { getUserAuth } from "@/lib/auth/utils"
import { usersOnGroups } from "@/lib/db/schema/users-on-groups"

export const getGroupsByUserId = async () => {
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  // Get groups that user is part of
  const r = await db.query.usersOnGroups.findMany({
    where: eq(usersOnGroups.userId, session.user.id),
    with: {
      group: true
    }
  })

  return { groups: r.map(({ group }) => group) }
}

export const getGroupById = async (id: GroupId) => {
  const { success: isValidGroupId } = groupIdSchema.safeParse({ id: +id })
  if (!isValidGroupId) return { error: "Invalid group id" }

  const g = await db.query.groups.findFirst({
    where: eq(groups.id, id)
  })

  if (g) return { group: g }
  else return { error: "No group with that id" }
}