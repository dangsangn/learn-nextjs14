import NextAuth, { User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials:", credentials.username, credentials.password)
        const responseUser = await fetch(
          "http://localhost:8080/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          }
        )

        const data = await responseUser.json()
        console.log("data:", data)

        // logic to salt and hash password

        if (!data) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return {
          id: data?.user?._id,
          name: data?.user?.name,
          email: data?.user?.email,
          access_token: data?.access_token,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated,
      //otherwise redirect to login page
      return !!auth
    },
  },
})
