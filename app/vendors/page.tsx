import { prisma } from "@/lib/prisma"
import { VendorCard } from "@/components/vendors/VendorCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                AI Vendor Partnership Programs
              </h1>
              <p className="text-slate-500">
                {vendors.length} vendors profiled — browse partnership criteria and requirements
              </p>
            </div>
            <Button asChild>
              <Link href="/profile/new">
                <Search className="h-4 w-4 mr-2" />
                Find My Best Matches
              </Link>
            </Button>
          </div>
        </div>

        {/* Vendor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center py-12 bg-white rounded-2xl border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Not sure which vendor is right for you?
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Complete a 5-minute readiness profile and get a ranked report showing
            your fit scores across all vendors.
          </p>
          <Button asChild size="lg">
            <Link href="/profile/new">
              Get Your Free Report
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
