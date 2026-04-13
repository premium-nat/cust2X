import Link from "next/link"
import type { Vendor } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PARTNERSHIP_TYPE_LABELS,
  INDUSTRY_LABELS,
  AI_MATURITY_LABELS,
} from "@/lib/types"
import type { PartnershipType, IndustryVertical } from "@/lib/types"
import { ExternalLink, CheckCircle, Users, Zap, Target, ArrowRight } from "lucide-react"

interface IdealPartnerProfile {
  minEmployees: number
  minAiMaturity: number
  requiredCapabilities: string[]
  preferredGtm: string[]
}

interface MinimumRequirements {
  minEmployees: number
  minAiMaturity: number
  existingUseCases: string[]
}

interface Props {
  vendor: Vendor
}

export function VendorDetail({ vendor }: Props) {
  const partnershipTypes = vendor.partnershipTypes as PartnershipType[]
  const targetIndustries = vendor.targetIndustries as IndustryVertical[]
  const ideal = vendor.idealPartnerProfile as unknown as IdealPartnerProfile
  const minimum = vendor.minimumRequirements as unknown as MinimumRequirements

  const initials = vendor.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">{vendor.name}</h1>
            {vendor.featured && (
              <Badge variant="default">Featured Partner</Badge>
            )}
          </div>
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-1"
          >
            Visit Partner Page
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <Button asChild>
          <Link href="/profile/new">
            Check My Fit
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">{vendor.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-blue-600" />
                Ideal Partner Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500 mb-1">Min. Employees</p>
                  <p className="font-semibold text-slate-900">
                    {ideal.minEmployees.toLocaleString()}+
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500 mb-1">Min. AI Maturity</p>
                  <p className="font-semibold text-slate-900">
                    {ideal.minAiMaturity}/5 — {AI_MATURITY_LABELS[ideal.minAiMaturity]}
                  </p>
                </div>
              </div>

              {ideal.requiredCapabilities.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Required Capabilities
                  </p>
                  <ul className="space-y-1">
                    {ideal.requiredCapabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ideal.preferredGtm.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Preferred GTM Models
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ideal.preferredGtm.map((gtm) => (
                      <Badge key={gtm} variant="secondary">
                        {gtm.replace(/_/g, " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-amber-500" />
                Minimum Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500 mb-1">Min. Employees</p>
                  <p className="font-semibold text-slate-900">
                    {minimum.minEmployees.toLocaleString()}+
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500 mb-1">Min. AI Maturity</p>
                  <p className="font-semibold text-slate-900">
                    {minimum.minAiMaturity}/5 — {AI_MATURITY_LABELS[minimum.minAiMaturity]}
                  </p>
                </div>
              </div>
              {minimum.existingUseCases.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    You should have or be working toward:
                  </p>
                  <ul className="space-y-1.5">
                    {minimum.existingUseCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Partnership Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {partnershipTypes.map((type) => (
                  <Badge key={type} variant="default">
                    {PARTNERSHIP_TYPE_LABELS[type]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-slate-500" />
                Priority Industries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {targetIndustries.map((industry) => (
                  <Badge key={industry} variant="outline">
                    {INDUSTRY_LABELS[industry]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                Are you a fit for {vendor.name}?
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Complete a 5-minute readiness profile and get a scored match report.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/profile/new">Get Matched Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
