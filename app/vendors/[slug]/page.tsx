import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { VendorDetail } from "@/components/vendors/VendorDetail"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const vendors = await prisma.vendor.findMany({ select: { slug: true } })
  return vendors.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const vendor = await prisma.vendor.findUnique({ where: { slug } })
  if (!vendor) return {}
  return {
    title: `${vendor.name} Partnership Program — C2X`,
    description: `Learn about ${vendor.name}'s AI vendor partnership program, criteria, and requirements. Check your fit with C2X.`,
  }
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params
  const vendor = await prisma.vendor.findUnique({ where: { slug } })

  if (!vendor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/vendors"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          All Vendors
        </Link>
        <VendorDetail vendor={vendor} />
      </div>
    </div>
  )
}
