import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from "./auth";
import { groups } from "./groups";
import { relations } from "drizzle-orm";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  groupId: integer("group_id").notNull().references(() => groups.id, { onDelete: "cascade" })
});

export const itemsRelations = relations(items, ({ one, many }) => ({
  user: one(users, {
    fields: [items.userId],
    references: [users.id]
  }),

  group: one(groups, {
    fields: [items.groupId],
    references: [groups.id]
  }),
}))

// Schema for CRUD - used to validate API requests
export const insertItemSchema = createInsertSchema(items);
export const selectItemSchema = createSelectSchema(items);
export const itemIdSchema = selectItemSchema.pick({ id: true });
export const updateItemSchema = selectItemSchema;

export type Item = z.infer<typeof selectItemSchema>;
export type NewItem = z.infer<typeof insertItemSchema>;
export type ItemId = z.infer<typeof itemIdSchema>["id"];