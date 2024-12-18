import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Next.js Starter Template
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A modern starter template with Next.js 14, Tailwind CSS, and TypeScript. 
            Includes authentication, database integration, and more.
          </p>
          <div className="space-x-4">
            {!session?.user ? (
              <>
                <Button asChild size="lg">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This starter template includes everything you need to build a modern web application
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Authentication using NextAuth.js with support for multiple providers
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Database</h3>
                <p className="text-sm text-muted-foreground">
                  PostgreSQL database with Prisma ORM for type-safe database access
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">UI Components</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful and accessible components built with Radix UI and Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
