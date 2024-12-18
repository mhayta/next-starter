"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const profileSchema = z.object({
  name: z.string().min(2).max(50),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Not authenticated" }
    }

    const validatedFields = profileSchema.safeParse({
      name: formData.get("name"),
    })

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { name } = validatedFields.data

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}

export async function updatePassword(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Not authenticated" }
    }

    const validatedFields = passwordSchema.safeParse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    })

    if (!validatedFields.success) {
      return { error: validatedFields.error.errors[0].message }
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    })

    if (!user?.password) {
      return { error: "No password set for this account" }
    }

    const { currentPassword, newPassword } = validatedFields.data

    const passwordsMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordsMatch) {
      return { error: "Current password is incorrect" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await db.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}
