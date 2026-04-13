"use client"

import { useState } from "react"
import Link from "next/link"
import type { VendorMatch } from "@/lib/types"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getScoreColor,
  getScoreBg,
  getScoreLabel,
  cn,
} from "@/lib/utils"
import {
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"

interface Props {
  match: VendorMatch
  rank: number
}

export function VendorMatchCard({ match, rank }: Props) {
  const [expanded, setExpanded] = useState(rank <= 1)

  const scoreColor = getScoreColor(match.fitScore)
  const scoreBg = getScoreBg(match.fitScore)
  const scoreLabel = getScoreLabel(match.fitScore)

  const progressColor =
    match.fitScore >= 80
      ? "bg-green-500"
      : match.fitScore >= 60
      ? "bg-blue-500"
      : match.fitScore >= 40
      ? "bg-amber-500"
      : "bg-red-500"

  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition-all",
        rank === 1 ? "border-blue-300 ring-1 ring-blue-200" : "border-slate-200"
      )}
    >
      {/* Card header - always visible */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          <div
            className={cn(
              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
              rank === 1
                ? "bg-blue-600"
                : rank === 2
                ? "bg-slate-600"
                : "bg-slate-400"
            )}
          >
            #{rank}
          </div>

          {/* Vendor info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-slate-900">{match.vendorName}</h3>
              <Badge
                className={cn(
                  "text-xs text-white",
                  scoreBg
                )}
              >
                {scoreLabel}
              </Badge>
            </div>

            {/* Score bar */}
            <div className="flex items-center gap-3">
              <Progress
                value={match.fitScore}
                className="flex-1 h-2"
                indicatorClassName={progressColor}
              />
              <span className={cn("text-sm font-bold w-14 text-right", scoreColor)}>
                {match.fitScore}/100
              </span>
            </div>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {match.reasoning}
        </p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 p-5 space-y-5">
          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
                Strengths to Highlight
              </h4>
              <ul className="space-y-1.5">
                {match.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
                Gaps to Close
              </h4>
              <ul className="space-y-1.5">
                {match.gaps.length > 0 ? (
                  match.gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                      {g}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-slate-500 italic">
                    No major gaps identified
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
              Your Next Steps
            </h4>
            <ol className="space-y-2">
              {match.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-1">
            <Button asChild size="sm" variant="outline">
              <Link href={`/vendors/${match.vendorSlug}`}>
                View {match.vendorName} Profile
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
