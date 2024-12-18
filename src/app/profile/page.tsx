import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { PasswordForm } from "@/components/password-form"
import { Toaster } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Toaster />
      <div className="container max-w-2xl py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={session.user} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
