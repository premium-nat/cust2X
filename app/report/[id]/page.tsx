import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ReportHeader } from "@/components/report/ReportHeader"
import { VendorMatchCard } from "@/components/report/VendorMatchCard"
import { GlobalInsights } from "@/components/report/GlobalInsights"
import { PrintButton } from "@/components/report/PrintButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReportData } from "@/lib/types"
import { Loader2, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params

  const report = await prisma.matchReport.findUnique({
    where: { id },
    include: { company: true },
  })

  if (!report) {
    notFound()
  }

  // Still processing
  if (report.status === "PROCESSING" || report.status === "PENDING") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Generating Your Report
          </h2>
          <p className="text-slate-500 mb-6 max-w-md">
            Our AI engine is scoring your profile against 10+ AI vendor
            partnership programs. This takes about 20–30 seconds.
          </p>
          <p className="text-sm text-slate-400">
            This page will update automatically when ready.{" "}
            <a
              href={`/report/${id}`}
              className="text-blue-600 hover:underline"
            >
              Refresh now
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Failed
  if (report.status === "FAILED") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Report Generation Failed
          </h2>
          <p className="text-slate-500 mb-6">
            Something went wrong while generating your report. Please try
            submitting your profile again.
          </p>
          <Button asChild>
            <Link href="/profile/new">Try Again</Link>
          </Button>
        </div>
      </div>
    )
  }

  const reportData = report.reportData as unknown as ReportData

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 no-print">
          <Link
            href="/profile/new"
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
          >
            ← New Report
          </Link>
          <PrintButton />
        </div>

        {/* Report Header */}
        <ReportHeader report={reportData} company={report.company} />

        {/* Global Insights */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Overall Assessment
          </h2>
          <GlobalInsights report={reportData} />
        </div>

        {/* Vendor Matches */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Your Top {reportData.topMatches.length} Vendor Matches
          </h2>
          <div className="space-y-4">
            {reportData.topMatches.map((match, i) => (
              <VendorMatchCard key={match.vendorId} match={match} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center py-10 bg-white rounded-2xl border border-slate-200 no-print">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Ready to start pursuing your top matches?
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm">
            Browse each vendor&apos;s full profile for detailed requirements,
            then use the next steps above to begin your outreach.
          </p>
          <Button asChild>
            <Link href="/vendors">
              Browse All Vendor Profiles
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
