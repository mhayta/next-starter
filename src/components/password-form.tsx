"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updatePassword } from "@/app/profile/actions"

export function PasswordForm() {
  const [isPending, startTransition] = useTransition()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await updatePassword(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Password updated successfully!")
      event.currentTarget.reset()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          placeholder="Enter your current password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          placeholder="Enter your new password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm your new password"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  )
}
