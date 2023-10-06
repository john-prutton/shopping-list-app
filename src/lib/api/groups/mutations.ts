"use server"

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { NewGroup, insertGroupSchema, groups, groupIdSchema, groupCodeSchema, GroupId, Group, GroupCode } from "@/lib/db/schema/groups";
import { addUserToGroup } from "../usersOnGroups/mutations";
import { getUserAuth } from "@/lib/auth/utils";
import { getGroupByCode, getGroupById } from "./queries";
import { usersOnGroups } from "@/lib/db/schema/users-on-groups";
import { items } from "@/lib/db/schema/items";

export const createGroup = async (group: NewGroup) => {
  // Check if user is logged in
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  const { success: isValidGroup } = insertGroupSchema.safeParse(group);
  if (!isValidGroup) return {
    error: "Group not valid"
  }

  // Try create group
  try {

    // Create group
    const [g] = await db.insert(groups).values({
      ...group,
      code: Date.now().toString(36).slice(-5)
    }).returning();

    // Add user to group
    const { error, success } = await addUserToGroup(session.user.id, g.id)

    if (error) return { error: "Group created, but couldn't add you to it" }

    return { group: g }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";

    console.error(message);
    return { error: message };
  }
};

export const joinGroup = async (groupCode: GroupCode) => {
  // Check if user is logged in
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  // Find group by code
  const { error: groupError, group } = await getGroupByCode(groupCode.toLowerCase())

  if (groupError) return {
    error: groupError
  }

  // Add user to group
  const { error } = await addUserToGroup(session.user.id, group!.id)
  if (error) return { error }

  return { group }
}

export const updateGroup = async (id: GroupId, group: NewGroup) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const newGroup = insertGroupSchema.parse(group);
  try {
    const [g] = await db
      .update(groups)
      .set(newGroup)
      .where(eq(groups.id, groupId!)).returning();
    return { group: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message);
    return { error: message };
  }
};

export const deleteGroup = async (id: GroupId) => {
  const { success: isValidGroupId } = groupIdSchema.safeParse({ id })
  if (!isValidGroupId) return { error: "Invalid group id with type " + typeof id }

  try {
    const res = await db.delete(groups).where(eq(groups.id, id!))

    return (res.rowsAffected === 1) ? { success: true } : { error: "Random error occured when deleting the group." }

  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message);
    return { error: message };
  }
};

export const leaveGroupByGroupId = async (id: GroupId) => {
  // Check if user is logged in
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  // Find group by id
  const { error, group } = await getGroupById(id)

  if (error) return {
    error: `There was an error fnding that group: ${error}`
  }

  // Check is user part of group
  const r = await db.query.usersOnGroups.findFirst({
    where: and(
      eq(usersOnGroups.groupId, group!.id),
      eq(usersOnGroups.userId, session.user.id)
    )
  })

  if (!r) return { error: "User is not part of this group" }

  // Try and remove user from group
  try {
    const res = await db.delete(usersOnGroups).where(eq(usersOnGroups.id, r.id))
  } catch (err) {
    console.log(`Error removing user: ${err}`)
    return { error: `There was an error removing the user from the group: ${err}` }
  }

  // Remove them from any items they were assigned to
  try {
    // Find all items the user is assigned to,
    // in this group
    const userItems = await db.query.items.findMany({
      where(item, { and, eq }) {
        return and(
          eq(item.userId, session.user.id),
          eq(item.groupId, group!.id)
        )
      },
    })

    if (userItems.length === 0) return { success: true }

    // Update all items to have no userId
    userItems.forEach(async (item) => {
      const [updatedItem] = await db
        .update(items)
        .set({ ...item, userId: null })
        .where(eq(items.id, item.id))
        .returning()

      if (!updatedItem || updatedItem.userId !== null) {
        return { error: `Failed to update item with id ${item.id}` }
      }
    })
  } catch (err) {
    console.log(`Error removing user from items: ${err}`)
    return { error: `There was an error removing the user from items: ${err}` }
  }

  // Check if there are no members in the group
  if ((await db.query.usersOnGroups.findMany({
    where: eq(usersOnGroups.groupId, group!.id),
  })).length === 0) {
    // Try delete the group
    const { error } = await deleteGroup(group!.id)
    if (error) return { error: `There was an error deleting the group: ${error}` }
  }

  return { success: true }
}