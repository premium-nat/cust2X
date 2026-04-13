import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReportNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Report Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          This report doesn&apos;t exist or has expired. Please generate a new report.
        </p>
        <Button asChild>
          <Link href="/profile/new">New Assessment</Link>
        </Button>
      </div>
    </div>
  )
}
