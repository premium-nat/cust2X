"use client"

import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { CompanyProfileInput } from "@/lib/types"
import { GTM_LABELS } from "@/lib/types"

interface Props {
  data: Partial<CompanyProfileInput>
  onChange: (field: keyof CompanyProfileInput, value: string | number) => void
  errors: Partial<Record<keyof CompanyProfileInput, string>>
}

const gtmDescriptions: Record<string, string> = {
  DIRECT_SALES: "You sell directly to enterprise or mid-market clients",
  CHANNEL: "You sell through resellers, distributors, or channel partners",
  CONSULTING_LED:
    "Services and advisory engagements drive your revenue and client relationships",
  PRODUCT_LED:
    "Your product drives acquisition and expansion (trials, freemium, self-serve)",
  OTHER: "Your model doesn't fit neatly into the above categories",
}

export function Step3GTM({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="gtmModel">Go-To-Market (GTM) Model</Label>
        <Select
          id="gtmModel"
          value={data.gtmModel ?? ""}
          onChange={(e) => onChange("gtmModel", e.target.value)}
        >
          <option value="" disabled>
            Select your GTM model...
          </option>
          {Object.entries(GTM_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        {data.gtmModel && (
          <p className="text-xs text-slate-500">
            {gtmDescriptions[data.gtmModel]}
          </p>
        )}
        {errors.gtmModel && (
          <p className="text-xs text-red-500">{errors.gtmModel}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientBase">
          Describe your client base
        </Label>
        <Textarea
          id="clientBase"
          placeholder="e.g. We primarily serve regional and national P&C insurance carriers with $500M–$5B in written premium, plus specialty insurers and MGAs. Typical buyer is the CIO or Chief Actuary..."
          rows={4}
          value={data.clientBase ?? ""}
          onChange={(e) => onChange("clientBase", e.target.value)}
        />
        <p className="text-xs text-slate-400">
          Include company types, sizes, industries, typical decision-makers, and geographies
        </p>
        {errors.clientBase && (
          <p className="text-xs text-red-500">{errors.clientBase}</p>
        )}
      </div>
    </div>
  )
}
