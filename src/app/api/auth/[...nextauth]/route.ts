import NextAuth from "next-auth"
import { authOptions } from "../../../../lib/auth"

const handler = NextAuth({
  ...authOptions,
  debug: true, // Enable debug messages
})

export { handler as GET, handler as POST }
