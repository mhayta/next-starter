"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "./ui/separator"
import { handleSignOut } from "@/app/auth/actions"

interface NavItem {
  name: string
  href: string
}

interface MobileNavProps {
  session: any
}

const publicNavigation: NavItem[] = [
  { name: "Home", href: "/" },
]

const protectedNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
]

export function MobileNav({ session }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navigation = session ? [...publicNavigation, ...protectedNavigation] : publicNavigation

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="px-7">
          <SheetTitle asChild>
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <span className="font-bold">Next Starter</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for mobile devices
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-2 px-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-foreground/80 hover:bg-muted ${
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-foreground/60"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!session ? (
            <div className="mt-4 space-y-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <form action={handleSignOut}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Sign Out
                </Button>
              </form>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
