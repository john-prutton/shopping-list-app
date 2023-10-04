"use server"

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { NewGroup, insertGroupSchema, groups, groupIdSchema, GroupId } from "@/lib/db/schema/groups";
import { createGroupCode } from "./utils";
import { addUserToGroup } from "../usersOnGroups/mutations";
import { getUserAuth } from "@/lib/auth/utils";

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
      code: createGroupCode()
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
  const { id: groupId } = groupIdSchema.parse({ id });
  try {
    const [g] = await db.delete(groups).where(eq(groups.id, groupId!)).returning();
    return { group: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message);
    return { error: message };
  }
};