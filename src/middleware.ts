import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

/**
 * Should compare token to sessions table in db, 
 * cant do this on the edge with sqlite though.
 * Hope this is good enough, because all protected pages 
 * use content based on the logged in user, making use of 
 * protected procedures from trpc.
 */
export default withAuth(
  async function middleware(req) {
    const sessionToken = req
      .cookies
      .get("next-auth.session-token")?.value

    const isAuth = !!sessionToken

    if (!isAuth)
      return NextResponse.redirect(new URL(`/api/auth/signin?callback=${req.nextUrl.pathname}`, req.url))
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/groups/:path*",
  ],
}