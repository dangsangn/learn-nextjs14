import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    _id: string
    name: string
    email: string
    access_token: string
  }

  interface Session {
    user: User & DefaultSession["user"]
    expires: string
    error: string
  }
}
