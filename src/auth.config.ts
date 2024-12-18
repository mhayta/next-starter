import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnProtectedRoute = nextUrl.pathname.startsWith("/dashboard") || 
                                nextUrl.pathname.startsWith("/profile")

      if (isOnProtectedRoute) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
