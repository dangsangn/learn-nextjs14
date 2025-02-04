import { RegisterForm } from "@/components/RegisterForm"
import React from "react"

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className="max-w-[400px] mx-auto mt-[200px] p-4 border rounded-md">
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
