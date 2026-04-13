export type IndustryVertical =
  | "FINANCIAL_SERVICES"
  | "INSURANCE"
  | "CONSULTING"
  | "TECH"
  | "OTHER"

export type GTMModel =
  | "DIRECT_SALES"
  | "CHANNEL"
  | "CONSULTING_LED"
  | "PRODUCT_LED"
  | "OTHER"

export type PartnershipType =
  | "RESELLER"
  | "REFERRAL"
  | "BUILD"
  | "INTEGRATE"
  | "CO_SELL"

export type ReportStatus = "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED"

export const INDUSTRY_LABELS: Record<IndustryVertical, string> = {
  FINANCIAL_SERVICES: "Financial Services",
  INSURANCE: "Insurance",
  CONSULTING: "Consulting",
  TECH: "Technology",
  OTHER: "Other",
}

export const GTM_LABELS: Record<GTMModel, string> = {
  DIRECT_SALES: "Direct Sales",
  CHANNEL: "Channel / Reseller",
  CONSULTING_LED: "Consulting-Led",
  PRODUCT_LED: "Product-Led Growth",
  OTHER: "Other",
}

export const PARTNERSHIP_TYPE_LABELS: Record<PartnershipType, string> = {
  RESELLER: "Reseller",
  REFERRAL: "Referral",
  BUILD: "Build",
  INTEGRATE: "Integrate",
  CO_SELL: "Co-Sell",
}

export const AI_MATURITY_LABELS: Record<number, string> = {
  1: "Exploring AI",
  2: "Experimenting",
  3: "Piloting Solutions",
  4: "Scaling Deployment",
  5: "AI-First Operations",
}

export interface VendorProfile {
  id: string
  name: string
  slug: string
  website: string
  description: string
  partnershipTypes: PartnershipType[]
  targetIndustries: IndustryVertical[]
  idealPartnerProfile: {
    minEmployees: number
    minAiMaturity: number
    requiredCapabilities: string[]
    preferredGtm: GTMModel[]
  }
  minimumRequirements: {
    minEmployees: number
    minAiMaturity: number
    existingUseCases: string[]
  }
}

export interface CompanyProfileInput {
  name: string
  website: string
  industry: IndustryVertical
  employeeCount: number
  aiMaturityLevel: number
  capabilities: string
  clientBase: string
  gtmModel: GTMModel
  partnershipGoals: string
  contactEmail: string
}

export interface VendorMatch {
  vendorId: string
  vendorName: string
  vendorSlug: string
  fitScore: number
  reasoning: string
  strengths: string[]
  gaps: string[]
  nextSteps: string[]
}

export interface ReportData {
  overallReadinessScore: number
  readinessSummary: string
  topMatches: VendorMatch[]
  globalStrengths: string[]
  globalGaps: string[]
  generatedAt: string
}
