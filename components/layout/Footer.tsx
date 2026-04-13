import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-900">C2X</span>
          </Link>
          <p className="text-sm text-slate-500 text-center">
            Connect. Qualify. Accelerate. — The AI Partnership Matchmaking Platform
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} C2X. Confidential.
          </p>
        </div>
      </div>
    </footer>
  )
}
