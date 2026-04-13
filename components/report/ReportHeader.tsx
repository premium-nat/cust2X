import type { Company } from "@prisma/client"
import type { ReportData } from "@/lib/types"
import { getScoreColor, getScoreLabel, getScoreBg } from "@/lib/utils"
import { CalendarDays, Building2 } from "lucide-react"
import { INDUSTRY_LABELS, AI_MATURITY_LABELS } from "@/lib/types"
import type { IndustryVertical } from "@/lib/types"

interface Props {
  report: ReportData
  company: Company
}

export function ReportHeader({ report, company }: Props) {
  const score = report.overallReadinessScore
  const scoreBg = getScoreBg(score)
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  const circumference = 2 * Math.PI * 40
  const progress = (score / 100) * circumference
  const scoreColorClass =
    score >= 80
      ? "stroke-green-500"
      : score >= 60
      ? "stroke-blue-500"
      : score >= 40
      ? "stroke-amber-500"
      : "stroke-red-500"

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Score gauge */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <svg width="100" height="100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="8"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference - progress}`}
                strokeLinecap="round"
                className={`${scoreColorClass} transition-all duration-700`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${scoreColor}`}>{score}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${scoreBg} text-white`}
          >
            {scoreLabel}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <h1 className="text-xl font-bold text-slate-900 truncate">
              {company.name} — Partnership Readiness Report
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 flex-wrap">
            <span>{INDUSTRY_LABELS[company.industry as IndustryVertical]}</span>
            <span>·</span>
            <span>{company.employeeCount.toLocaleString()} employees</span>
            <span>·</span>
            <span>
              AI Maturity {company.aiMaturityLevel}/5 —{" "}
              {AI_MATURITY_LABELS[company.aiMaturityLevel]}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(report.generatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">{report.readinessSummary}</p>
        </div>
      </div>
    </div>
  )
}
