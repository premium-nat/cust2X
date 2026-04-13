import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "Ranked vendor matches with fit scores",
  "Positioning advice tailored to your profile",
  "Gaps to close before approaching vendors",
  "Concrete next steps for each top match",
]

export function CTASection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            The companies that partner well in 2026 will dominate their
            categories by 2028.
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            C2X is how they get there faster. Get your free Partnership
            Readiness Report today.
          </p>

          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            <Link href="/profile/new">
              Start Your Free Assessment
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
