import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./auth";
import { groups } from "./groups";
import { relations } from "drizzle-orm";

export const usersOnGroups = sqliteTable("users_on_groups", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  groupId: integer("group_id").notNull().references(() => groups.id, { onDelete: "cascade" }),
  color: text("user_color").notNull().$defaultFn(() => `hsl(${Math.random() * 360}, 45%, 55%)`)
})

export const usersOnGroupsRelations = relations(
  usersOnGroups,
  ({ one, many }) => ({
    user: one(users, {
      fields: [usersOnGroups.userId],
      references: [users.id]
    }),

    group: one(groups, {
      fields: [usersOnGroups.groupId],
      references: [groups.id]
    })
  })
)
