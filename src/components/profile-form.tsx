"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updateProfile } from "@/app/profile/actions"

interface ProfileFormProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await updateProfile(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Profile updated!")
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name || ""}
          required
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          defaultValue={user.email || ""}
          disabled
          className="bg-muted"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  )
}
