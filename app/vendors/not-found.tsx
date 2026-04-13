import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VendorNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Vendor Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          This vendor profile doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/vendors">Browse All Vendors</Link>
        </Button>
      </div>
    </div>
  )
}
