"use server"

import { signIn } from "@/auth"

export async function authenticate(username: string, password: string) {
  return await signIn("credentials", {
    username: username,
    password: password,
    redirect: false,
  })
}
