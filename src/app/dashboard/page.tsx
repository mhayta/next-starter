import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-muted-foreground">You are now signed in.</p>
      </div>

      <div className="flex items-center gap-4">
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button variant="outline">Sign Out</Button>
        </form>
      </div>
    </div>
  )
}
