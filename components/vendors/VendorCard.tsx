import Link from "next/link"
import type { Vendor } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight } from "lucide-react"
import { PARTNERSHIP_TYPE_LABELS, INDUSTRY_LABELS } from "@/lib/types"
import type { PartnershipType, IndustryVertical } from "@/lib/types"

interface Props {
  vendor: Vendor
}

export function VendorCard({ vendor }: Props) {
  const initials = vendor.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const partnershipTypes = vendor.partnershipTypes as PartnershipType[]
  const targetIndustries = vendor.targetIndustries as IndustryVertical[]

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-sm">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{vendor.name}</CardTitle>
              {vendor.featured && (
                <Badge variant="default" className="text-xs">Featured</Badge>
              )}
            </div>
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mt-0.5"
            >
              {vendor.website.replace(/https?:\/\//, "").split("/")[0]}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0 space-y-3">
        <p className="text-sm text-slate-600 line-clamp-3">{vendor.description}</p>

        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">Partnership Types</p>
          <div className="flex flex-wrap gap-1">
            {partnershipTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {PARTNERSHIP_TYPE_LABELS[type]}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">Priority Industries</p>
          <div className="flex flex-wrap gap-1">
            {targetIndustries.slice(0, 3).map((industry) => (
              <Badge key={industry} variant="outline" className="text-xs">
                {INDUSTRY_LABELS[industry]}
              </Badge>
            ))}
            {targetIndustries.length > 3 && (
              <Badge variant="outline" className="text-xs text-slate-400">
                +{targetIndustries.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-3">
        <Button asChild size="sm" className="flex-1">
          <Link href={`/vendors/${vendor.slug}`}>
            View Profile
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
