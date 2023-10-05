"use server"

import { getUserAuth } from "@/lib/auth/utils"
import { db } from "@/lib/db"
import { items, type NewItem } from "@/lib/db/schema/items"


export const createItem = async (newItem: NewItem) => {
  // Check if user is authed
  const { session } = await getUserAuth()

  if (!session) return { error: "Unauthorised" }

  // Check if user is in group
  const res = await db.query.usersOnGroups.findFirst({
    where(usersOnGroups, { eq, and }) {
      return and(
        eq(usersOnGroups.userId, session.user.id),
        eq(usersOnGroups.groupId, newItem.groupId)
      )
    },
  })

  if (!res) return {
    error: "You are not part of that group"
  }

  // Finally create item
  try {
    const [createdItem] = await db.insert(items).values(newItem).returning()
    return { item: createdItem }
  } catch (err) {
    return {
      error: `There was an error creating the item in the database: ${err}`
    }
  }
}