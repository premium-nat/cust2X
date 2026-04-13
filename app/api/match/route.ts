import { NextRequest } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { generateReport } from "@/lib/matching-engine"
import { VENDOR_PROFILES } from "@/lib/vendor-profiles"
import { getAnthropicKey } from "@/lib/config"
import type { CompanyProfileInput } from "@/lib/types"

const MatchRequestSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  website: z.string().min(1, "Website is required"),
  industry: z.enum([
    "FINANCIAL_SERVICES",
    "INSURANCE",
    "CONSULTING",
    "TECH",
    "OTHER",
  ]),
  employeeCount: z.number().int().min(1, "Employee count must be at least 1"),
  aiMaturityLevel: z.number().int().min(1).max(5),
  capabilities: z.string().min(10, "Please describe your capabilities"),
  clientBase: z.string().min(10, "Please describe your client base"),
  gtmModel: z.enum([
    "DIRECT_SALES",
    "CHANNEL",
    "CONSULTING_LED",
    "PRODUCT_LED",
    "OTHER",
  ]),
  partnershipGoals: z
    .string()
    .min(10, "Please describe your partnership goals"),
  contactEmail: z.string().email("Please enter a valid email"),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = MatchRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const input = parsed.data as CompanyProfileInput

  // Check API key is configured
  const apiKey = await getAnthropicKey()
  if (!apiKey) {
    return Response.json(
      { error: "API key not configured", setupRequired: true },
      { status: 503 }
    )
  }

  // Create Company record
  const company = await prisma.company.create({
    data: {
      name: input.name,
      website: input.website,
      industry: input.industry,
      employeeCount: input.employeeCount,
      aiMaturityLevel: input.aiMaturityLevel,
      capabilities: input.capabilities,
      clientBase: input.clientBase,
      gtmModel: input.gtmModel,
      partnershipGoals: input.partnershipGoals,
      contactEmail: input.contactEmail,
    },
  })

  // Create MatchReport in PROCESSING state
  const report = await prisma.matchReport.create({
    data: {
      companyId: company.id,
      status: "PROCESSING",
      overallScore: 0,
    },
  })

  // Run AI matching engine
  try {
    const result = await generateReport(input, VENDOR_PROFILES, apiKey)

    // Find vendor records for the matched vendors
    const matchedSlugs = result.report.topMatches.map((m) => m.vendorSlug)
    const vendors = await prisma.vendor.findMany({
      where: { slug: { in: matchedSlugs } },
    })

    // Update report with results
    await prisma.matchReport.update({
      where: { id: report.id },
      data: {
        status: "COMPLETE",
        overallScore: result.report.overallReadinessScore,
        reportData: result.report as object,
        inputTokens: result.usage.inputTokens,
        outputTokens: result.usage.outputTokens,
        cacheReadTokens: result.usage.cacheReadTokens,
        cacheWriteTokens: result.usage.cacheWriteTokens,
        vendors: {
          connect: vendors.map((v) => ({ id: v.id })),
        },
      },
    })

    return Response.json({ reportId: report.id })
  } catch (error) {
    await prisma.matchReport.update({
      where: { id: report.id },
      data: { status: "FAILED" },
    })

    console.error("Matching engine error:", error)
    return Response.json(
      { error: "Failed to generate report. Please try again." },
      { status: 500 }
    )
  }
}
