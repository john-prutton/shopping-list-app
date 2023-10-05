"use server"

import { db } from "@/lib/db";
import type { GroupId } from "@/lib/db/schema/groups";

export async function getItemsByGroup(groupId: GroupId): Promise<{
  items?: {
    id: number,
    name: string,
    member?: {
      id: string,
      name: string,
      color: string
    }
  }[], error?: string
}> {
  // Get all items in a group
  const items = await db.query.items.findMany({
    where: (item, { eq }) => {
      return eq(item.groupId, groupId)
    },

    with: {
      user: {
        columns: {
          name: true
        }
      }
    }
  })

  console.log(`Items found with group id ${groupId}: ${items.length}`)

  if (items.length === 0) return { items: [] }

  // Get unique userIds
  const userIds = new Set<string>()
  items.forEach((item) => { if (item.userId) userIds.add(item.userId) })

  if (userIds.size === 0) return {
    items: items.map((item) => ({
      id: item.id,
      name: item.name
    }))
  }

  // Get user colors
  const results = await db.query.usersOnGroups.findMany({
    where(usersOnGroups, { and, eq, inArray }) {
      return and(
        eq(usersOnGroups.groupId, groupId),
        inArray(usersOnGroups.userId, [...userIds])
      )
    },

    columns: {
      color: true, userId: true
    }
  })

  if (results.length !== userIds.size) {
    console.log("Something went wrong getting user info: no users found in the group")
    return { error: "An error occured: Failed to find users" }
  }

  const userColors = new Map<string, string>()
  results.forEach(({ userId, color }) => userColors.set(userId, color))

  const itemsWithDetails = items.map((item) => ({
    id: item.id,
    name: item.name,
    ...item.userId &&
    {
      member: {
        id: item.userId,
        name: item.user!.name,
        color: userColors.get(item.userId)!
      }
    }
  }))

  return {
    items: itemsWithDetails
  }
}