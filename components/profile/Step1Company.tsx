"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import type { CompanyProfileInput } from "@/lib/types"
import { INDUSTRY_LABELS } from "@/lib/types"

interface Props {
  data: Partial<CompanyProfileInput>
  onChange: (field: keyof CompanyProfileInput, value: string | number) => void
  errors: Partial<Record<keyof CompanyProfileInput, string>>
}

export function Step1Company({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Company Name</Label>
        <Input
          id="name"
          placeholder="e.g. Meridian Advisory Group"
          value={data.name ?? ""}
          onChange={(e) => onChange("name", e.target.value)}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          placeholder="e.g. meridianadvisory.com"
          value={data.website ?? ""}
          onChange={(e) => onChange("website", e.target.value)}
        />
        {errors.website && (
          <p className="text-xs text-red-500">{errors.website}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Primary Industry Vertical</Label>
        <Select
          id="industry"
          value={data.industry ?? ""}
          onChange={(e) => onChange("industry", e.target.value)}
        >
          <option value="" disabled>
            Select your industry...
          </option>
          {Object.entries(INDUSTRY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        {errors.industry && (
          <p className="text-xs text-red-500">{errors.industry}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="employeeCount">Number of Employees</Label>
        <Input
          id="employeeCount"
          type="number"
          placeholder="e.g. 150"
          min={1}
          value={data.employeeCount ?? ""}
          onChange={(e) => onChange("employeeCount", parseInt(e.target.value) || 0)}
        />
        {errors.employeeCount && (
          <p className="text-xs text-red-500">{errors.employeeCount}</p>
        )}
      </div>
    </div>
  )
}
