import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import { env } from '../env.mjs';

import * as GroupSchema from "@/lib/db/schema/groups"

export const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle(sqlite, {
  schema: {
    ...GroupSchema
  }
});
