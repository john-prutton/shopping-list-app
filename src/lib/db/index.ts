import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '../env.mjs';

export const sqlite = new Database(env.DATABASE_URL);
export const db: BetterSQLite3Database = drizzle(sqlite);
