"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Calculator, ExternalLink, LogOut, ShoppingBag,
  Image as ImageIcon, BarChart3, Settings, Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  {
    icon: Calculator,
    title: "Pricing Calculator",
    description: "Calculate product costs and suggested selling prices.",
    href: "/pricing-calculator",
    internal: true,
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Stripe Dashboard",
    description: "View payments, orders and payouts.",
    href: "https://dashboard.stripe.com",
    internal: false,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: ImageIcon,
    title: "Cloudinary",
    description: "Access and manage customer photo uploads.",
    href: "https://console.cloudinary.com/console/media_library",
    internal: false,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    icon: Settings,
    title: "Vercel",
    description: "Deployments, logs and environment variables.",
    href: "https://vercel.com/rachelpairols-projects/we-mark",
    internal: false,
    color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },
  {
    icon: ShoppingBag,
    title: "Shop (live site)",
    description: "View the public shop as a customer.",
    href: "/shop",
    internal: true,
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    icon: Package,
    title: "Services page",
    description: "View and test the services & quote forms.",
    href: "/services",
    internal: true,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
]

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/Images/WeMarkLogo2.png"
              alt="WeMark"
              width={80}
              height={80}
              className="h-12 w-auto"
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back, Rachel. Here are your tools.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(tool => {
            const Icon = tool.icon
            const CardWrapper = tool.internal ? Link : "a"
            const props = tool.internal
              ? { href: tool.href }
              : { href: tool.href, target: "_blank", rel: "noopener noreferrer" }

            return (
              // @ts-expect-error dynamic component
              <CardWrapper
                key={tool.title}
                {...props}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-start justify-between flex-1">
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  {!tool.internal && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </main>
    </div>
  )
}
