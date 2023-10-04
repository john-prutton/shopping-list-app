import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { groupIdSchema, groups, GroupId } from "@/lib/db/schema/groups";

export const getGroups = async () => {
  const g = await db.select().from(groups);
  return { groups: g };
};

export const getGroupById = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const [g] = await db.select().from(groups).where(eq(groups.id, groupId));

  return { group: g };
};