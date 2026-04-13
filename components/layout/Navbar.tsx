import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">C2X</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/vendors"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              AI Vendors
            </Link>
            <Link
              href="/profile/new"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Get Matched
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm">
              <Link href="/profile/new">Get Your Report</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
