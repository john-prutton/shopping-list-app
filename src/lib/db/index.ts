import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client/web"

import { env } from "../env.mjs"

import * as GroupSchema from "@/lib/db/schema/groups"
import * as AuthSchema from "@/lib/db/schema/auth"
import * as UserGroupSchema from "@/lib/db/schema/users-on-groups"
import * as ItemSchema from "@/lib/db/schema/items"

export const sqlite = createClient({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
})
export const db = drizzle(sqlite, {
	schema: {
		...GroupSchema,
		...AuthSchema,
		...UserGroupSchema,
		...ItemSchema,
	},
})
