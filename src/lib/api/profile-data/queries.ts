import { eq, sql } from "drizzle-orm";

import { getUserAuth } from "@/lib/auth/utils";

import { db } from "@/lib/db";
import { usersOnGroups } from "@/lib/db/schema/users-on-groups";
import { items } from "@/lib/db/schema/items";

import patternsPicture from "@/../public/patterns.png"

export async function getProfileData() {
  // Get user and do auth check
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  // Get user data
  const profilePicture = session.user.image ?? patternsPicture.src
  const userName = session.user.name

  // Get total tasks and groups
  const [{ count: groupCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(usersOnGroups)
    .where(eq(usersOnGroups.userId, session.user.id))

  const [{ count: itemCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(items)
    .where(eq(items.userId, session.user.id))

  return {
    userName,
    profilePicture,
    groups: groupCount,
    items: itemCount
  }
}