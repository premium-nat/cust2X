"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CompanyProfileInput } from "@/lib/types"

interface Props {
  data: Partial<CompanyProfileInput>
  onChange: (field: keyof CompanyProfileInput, value: string | number) => void
  errors: Partial<Record<keyof CompanyProfileInput, string>>
}

export function Step4Goals({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="partnershipGoals">
          What are your partnership goals?
        </Label>
        <Textarea
          id="partnershipGoals"
          placeholder="e.g. We want to become a certified Anthropic partner so we can resell Claude to our insurance carrier clients, embed Claude in our advisory methodology, and access Anthropic's enterprise sales team for co-selling opportunities..."
          rows={5}
          value={data.partnershipGoals ?? ""}
          onChange={(e) => onChange("partnershipGoals", e.target.value)}
        />
        <p className="text-xs text-slate-400">
          Be specific: What partnership type? What commercial outcome? What access or resources do you need?
        </p>
        {errors.partnershipGoals && (
          <p className="text-xs text-red-500">{errors.partnershipGoals}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="you@yourcompany.com"
          value={data.contactEmail ?? ""}
          onChange={(e) => onChange("contactEmail", e.target.value)}
        />
        <p className="text-xs text-slate-400">
          We&apos;ll send your Partnership Readiness Report to this address
        </p>
        {errors.contactEmail && (
          <p className="text-xs text-red-500">{errors.contactEmail}</p>
        )}
      </div>
    </div>
  )
}
