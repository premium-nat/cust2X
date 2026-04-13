import { ClipboardList, Sparkles, FileText } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Build Your Profile",
    description:
      "Complete a structured 4-step AI Partnership Readiness Profile covering your company's capabilities, AI maturity, GTM model, and partnership goals. Takes under 5 minutes.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI-Powered Matching",
    description:
      "Our Claude-powered matching engine evaluates your profile against criteria from 10+ AI vendors — scoring fit across industry alignment, maturity, GTM compatibility, and goals.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    number: "03",
    icon: FileText,
    title: "Receive Your Report",
    description:
      "Get a ranked Partnership Readiness Report with fit scores, positioning advice, gaps to close, and specific next steps for each top-matched vendor. Stop guessing, start winning.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            How C2X Works
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            From profile to ranked matches in under 3 minutes. No cold outreach
            required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-full w-full h-px bg-slate-100 -translate-x-1/2 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="flex items-center justify-center mb-6">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.bg} relative`}
                  >
                    <step.icon className={`h-9 w-9 ${step.color}`} />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
