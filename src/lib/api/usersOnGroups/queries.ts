"use server"

import { db } from "@/lib/db";
import { GroupId } from "@/lib/db/schema/groups";
import { usersOnGroups } from "@/lib/db/schema/users-on-groups";
import { eq } from "drizzle-orm";

export const getGroupMembers = async (id: GroupId) => {
  const rows = await db.query.usersOnGroups.findMany({
    where: eq(usersOnGroups.groupId, id),
    with: {
      user: true
    }
  })

  // Check if nothing was found
  if (rows.length === 0) {
    console.log(`Error: group ${id} should be deleted cause it has no members`)
  }

  return rows.map((row, i) => ({
    id: row.user.id,
    name: row.user.name,
    color: row.color
  }))
}