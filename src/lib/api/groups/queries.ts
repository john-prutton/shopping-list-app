import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { groupIdSchema, groups, GroupId } from "@/lib/db/schema/groups"

export const getGroups = async () => {
  const g = await db.select().from(groups)
  return { groups: g }
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