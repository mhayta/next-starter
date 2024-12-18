import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { register } from "./actions"

export default async function RegisterPage() {
  const session = await auth()
  
  // Redirect to dashboard if already logged in
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">Enter your information to get started</p>
      </div>
      
      <form action={register} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Sign in
        </a>
      </p>
    </div>
  )
}
