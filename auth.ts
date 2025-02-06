import NextAuth from "next-auth"
import { AuthError } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
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

        if (data.statusCode === 201) {
          return {
            id: data?.user?._id,
            name: data?.user?.name,
            email: data?.user?.email,
            access_token: data?.access_token,
          }
        } else if (data.statusCode === 400) {
          throw new AuthError("InvalidEmailPasswordError")
        } else if (data.statusCode === 401) {
          throw new AuthError("InactiveAccountError")
        } else {
          throw new AuthError("ServerError")
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
