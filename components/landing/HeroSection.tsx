import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 sm:py-32">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-300 mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Partnership Intelligence Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Connect.{" "}
          <span className="text-blue-400">Qualify.</span>{" "}
          Accelerate.
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop guessing which AI vendor to partner with. C2X scores your company
          against 10+ AI vendor partnership programs and delivers a ranked
          readiness report in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25">
            <Link href="/profile/new">
              Get Your Readiness Report
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            <Link href="/vendors">Browse AI Vendors</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          11 AI vendors profiled · Free readiness assessment · Instant ranked matches
        </p>
      </div>
    </section>
  )
}
