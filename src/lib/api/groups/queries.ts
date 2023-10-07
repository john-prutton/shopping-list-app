"use server"

import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { groupIdSchema, groups, GroupId, GroupCode, groupCodeSchema } from "@/lib/db/schema/groups"
import { getUserAuth } from "@/lib/auth/utils"
import { usersOnGroups } from "@/lib/db/schema/users-on-groups"

export const getGroupsByUserId = async () => {
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  // Get groups that user is part of
  const r = await db.query.usersOnGroups.findMany({
    where: eq(usersOnGroups.userId, session.user.id),
    with: {
      group: {
        with: {
          items: true
        }
      }
    }
  })

  return { groups: r.map(({ group }) => group) }
}

export const getGroupById = async (id: GroupId) => {
  const { success: isValidGroupId } = groupIdSchema.safeParse({ id: +id })
  if (!isValidGroupId) return { error: "Invalid group id" }

  const g = await db.query.groups.findFirst({
    where: eq(groups.id, id),
  })


  if (g) return { group: g }
  else return { error: "No group with that id" }
}

export const getGroupByCode = async (code: GroupCode) => {
  const { success: isValidGroupCode } = groupCodeSchema.safeParse({ code })
  if (!isValidGroupCode) return { error: "Invalid group code with type " + typeof code }

  const g = await db.query.groups.findFirst({
    where: eq(groups.code, code)
  })

  if (g) return { group: g }
  else return { error: "No group with that code" }
}

export const getGroupCode = async (id: GroupId) => {
  // Try get group by id
  const { error, group } = await getGroupById(id)

  if (error) return {
    error: `There was an error trying to find that group: ${error}`
  }

  return { code: group!.code }
}
