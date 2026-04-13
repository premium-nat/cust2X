"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CompanyProfileInput } from "@/lib/types"
import { AI_MATURITY_LABELS } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  data: Partial<CompanyProfileInput>
  onChange: (field: keyof CompanyProfileInput, value: string | number) => void
  errors: Partial<Record<keyof CompanyProfileInput, string>>
}

const maturityDescriptions: Record<number, string> = {
  1: "Researching AI concepts, attending demos, no active projects",
  2: "Running proof-of-concept experiments or early pilots",
  3: "Have 1-3 AI pilots in progress or recently completed",
  4: "Deploying AI solutions for clients or internal operations",
  5: "AI is core to your service delivery and operating model",
}

export function Step2Maturity({ data, onChange, errors }: Props) {
  const selected = data.aiMaturityLevel ?? 0

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>AI Maturity Level</Label>
        <div className="grid gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChange("aiMaturityLevel", level)}
              className={cn(
                "flex items-start gap-4 p-3 rounded-lg border text-left transition-all",
                selected === level
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  selected === level
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {level}
              </span>
              <div>
                <p className="font-medium text-sm">
                  {AI_MATURITY_LABELS[level]}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {maturityDescriptions[level]}
                </p>
              </div>
            </button>
          ))}
        </div>
        {errors.aiMaturityLevel && (
          <p className="text-xs text-red-500">{errors.aiMaturityLevel}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="capabilities">
          What does your company do? Describe your services and capabilities.
        </Label>
        <Textarea
          id="capabilities"
          placeholder="e.g. We provide technology transformation consulting to mid-market insurance carriers, specializing in core systems modernization, data analytics, and increasingly AI-enabled underwriting and claims automation..."
          rows={4}
          value={data.capabilities ?? ""}
          onChange={(e) => onChange("capabilities", e.target.value)}
        />
        <p className="text-xs text-slate-400">
          Be specific about your core services, technical capabilities, and industry expertise
        </p>
        {errors.capabilities && (
          <p className="text-xs text-red-500">{errors.capabilities}</p>
        )}
      </div>
    </div>
  )
}
