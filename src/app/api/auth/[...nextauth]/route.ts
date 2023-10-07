import { db } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env.mjs"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { accounts, users } from "@/lib/db/schema/auth";
import { and, eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: {
    // @ts-expect-error
    ...DrizzleAdapter(db),
    async getUserByAccount(providerAccountId) {
      const results = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, providerAccountId.provider),
            eq(accounts.providerAccountId, providerAccountId.providerAccountId),
          ),
        )
        .get();

      return results?.user ?? null;
    },
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
