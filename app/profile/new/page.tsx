import { ProfileWizard } from "@/components/profile/ProfileWizard"
import { Sparkles } from "lucide-react"

export default function NewProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Matching
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Get Your Partnership Readiness Report
        </h1>
        <p className="text-slate-500">
          Complete your profile and our AI engine will score your fit against
          10+ AI vendor partnership programs.
        </p>
      </div>
      <ProfileWizard />
    </div>
  )
}
