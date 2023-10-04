import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const groups = sqliteTable("groups", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique()
});

// Schema for CRUD - used to validate API requests
export const insertGroupSchema = createInsertSchema(groups).extend({
  code: z.string().optional()
});
export const selectGroupSchema = createSelectSchema(groups);
export const groupIdSchema = selectGroupSchema.pick({ id: true });
export const updateGroupSchema = selectGroupSchema;

export type Group = z.infer<typeof selectGroupSchema>;
export type NewGroup = z.infer<typeof insertGroupSchema>;
export type GroupId = z.infer<typeof groupIdSchema>["id"];