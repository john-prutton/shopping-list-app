import { env } from "@/lib/env.mjs";

import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from '@libsql/client';


const runMigrate = async () => {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }


  const sqlite = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
  const db = drizzle(sqlite);


  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});