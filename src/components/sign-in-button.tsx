import { signIn } from "@/auth"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="p-2 border border-black" type="submit">
        Sign in
      </button>
    </form>
  )
}