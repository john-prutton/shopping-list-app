"use server"

import { db } from "@/lib/db"
import { UserId } from "@/lib/db/schema/auth"
import type { GroupCode, GroupId } from "@/lib/db/schema/groups"
import { usersOnGroups } from "@/lib/db/schema/users-on-groups"
import { and, eq } from "drizzle-orm"
import { getGroupByCode } from "../groups/queries"

export async function addUserToGroup(userId: UserId, groupId: GroupId) {
  // First check if user is in group
  const test = await db.query.usersOnGroups.findFirst({
    where: and(
      eq(usersOnGroups.userId, userId),
      eq(usersOnGroups.groupId, groupId),
    )
  })

  if (test) return { error: "User already in this group" }


  // Try and add user to group
  try {
    const res = await db.insert(usersOnGroups).values({ groupId, userId })
    if (res.rowsAffected === 1) return { success: true }
    else return { error: `An error occured and ${res.rowsAffected} users were added to the group` }

  } catch (err) {
    console.log(`Error adding user to group: ${err}`)
    return {
      error: `There was an error adding user to group: ${err}`
    }
  }
}


export async function addUserToGroupByCode(userId: UserId, groupCode: GroupCode) {
  const { error: getGroupError, group } = await getGroupByCode(groupCode)
  if (getGroupError) return {
    error: `There was an error while trying to get group by code: ${getGroupError}`
  }

  const { error: addUserToGroupError } = await addUserToGroup(userId, group!.id)
  if (addUserToGroupError) return {
    error: `There was an error adding the user to the group: ${addUserToGroupError}`
  }

  return { group: group }
}