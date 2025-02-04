import { LoginForm } from "@/components/LoginForm"

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="max-w-[400px] mx-auto mt-[200px] p-4 border rounded-md">
      <LoginForm />
    </div>
  )
}

export default LoginPage
