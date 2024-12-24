import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and trying to access login page,
    // redirect them to home page
    if (req.nextUrl.pathname.startsWith("/login") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname.startsWith("/login")) {
          return true
        }
        // Require authentication for all other pages
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
