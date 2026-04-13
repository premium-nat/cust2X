import { z } from "zod"
import Anthropic from "@anthropic-ai/sdk"
import type { CompanyProfileInput, ReportData, VendorProfile } from "./types"
import { INDUSTRY_LABELS, GTM_LABELS, AI_MATURITY_LABELS } from "./types"

const VendorMatchSchema = z.object({
  vendorId: z.string(),
  vendorName: z.string(),
  vendorSlug: z.string(),
  fitScore: z.number().min(0).max(100),
  reasoning: z.string(),
  strengths: z.array(z.string()).min(1),
  gaps: z.array(z.string()),
  nextSteps: z.array(z.string()).min(1),
})

const ReportDataSchema = z.object({
  overallReadinessScore: z.number().min(0).max(100),
  readinessSummary: z.string(),
  topMatches: z.array(VendorMatchSchema).min(1).max(5),
  globalStrengths: z.array(z.string()).min(1),
  globalGaps: z.array(z.string()),
  generatedAt: z.string(),
})

const SYSTEM_PROMPT_PREFIX = `You are an expert AI partnership strategist for mid-market companies in financial services, insurance, consulting, and technology.

Your task is to evaluate a company's AI Partnership Readiness Profile against a set of AI vendor partnership programs. You must return a structured JSON analysis with vendor fit scores, reasoning, and actionable next steps.

SCORING RUBRIC:
- fitScore 80-100: Excellent alignment — pursue this vendor immediately
- fitScore 60-79: Good fit — minor gaps addressable with preparation
- fitScore 40-59: Moderate fit — significant prep needed before approaching
- fitScore 0-39: Poor fit currently — not recommended at this time

EVALUATION CRITERIA (weighted):
1. Industry vertical alignment (25%): Does the vendor prioritize the company's industry?
2. AI maturity match (25%): Does the company meet the vendor's minimum maturity threshold?
3. GTM model compatibility (20%): Does the company's go-to-market approach align with vendor preference?
4. Company size thresholds (15%): Does the company meet minimum employee requirements?
5. Partnership goal alignment (15%): Do the company's stated goals match what the vendor offers?

Be specific, actionable, and honest. If a company has gaps, name them clearly. If a company is a strong fit, explain exactly why.

VENDOR PROFILES (evaluate against all of these):
`

const SYSTEM_PROMPT_SUFFIX = `

OUTPUT REQUIREMENTS:
Return ONLY valid JSON matching this exact structure. No markdown, no explanation text, just JSON:

{
  "overallReadinessScore": <number 0-100>,
  "readinessSummary": "<2-3 sentence summary of the company's overall readiness and positioning>",
  "topMatches": [
    {
      "vendorId": "<vendor id>",
      "vendorName": "<vendor name>",
      "vendorSlug": "<vendor slug>",
      "fitScore": <number 0-100>,
      "reasoning": "<2-3 sentences explaining this specific fit score>",
      "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
      "gaps": ["<gap 1>", "<gap 2>"],
      "nextSteps": ["<concrete action 1>", "<concrete action 2>", "<concrete action 3>"]
    }
  ],
  "globalStrengths": ["<cross-vendor strength 1>", "<cross-vendor strength 2>", "<cross-vendor strength 3>"],
  "globalGaps": ["<cross-vendor gap 1>", "<cross-vendor gap 2>"],
  "generatedAt": "<ISO timestamp>"
}

Include the top 5 vendors sorted by fitScore descending. Even if scores are low, still include 5 matches. Include all required fields.`

function buildSystemBlocks(vendors: VendorProfile[]) {
  return [
    {
      type: "text" as const,
      text: SYSTEM_PROMPT_PREFIX,
    },
    {
      type: "text" as const,
      text: JSON.stringify(vendors, null, 2),
      cache_control: { type: "ephemeral" as const },
    },
    {
      type: "text" as const,
      text: SYSTEM_PROMPT_SUFFIX,
    },
  ]
}

function buildCompanyPrompt(company: CompanyProfileInput): string {
  return `Evaluate this company's AI partnership readiness:

Company: ${company.name}
Website: ${company.website}
Industry: ${INDUSTRY_LABELS[company.industry]}
Employees: ${company.employeeCount}
AI Maturity Level: ${company.aiMaturityLevel}/5 — ${AI_MATURITY_LABELS[company.aiMaturityLevel]}
GTM Model: ${GTM_LABELS[company.gtmModel]}

Capabilities / What they do:
${company.capabilities}

Client Base:
${company.clientBase}

Partnership Goals:
${company.partnershipGoals}

Evaluate this company against all vendor profiles and return the top 5 matches with fit scores, reasoning, strengths, gaps, and next steps. Set generatedAt to the current ISO timestamp.`
}

export interface MatchResult {
  report: ReportData
  usage: {
    inputTokens: number
    outputTokens: number
    cacheReadTokens: number
    cacheWriteTokens: number
  }
}

export async function generateReport(
  company: CompanyProfileInput,
  vendors: VendorProfile[],
  apiKey: string
): Promise<MatchResult> {
  const client = new Anthropic({ apiKey })
  const systemBlocks = buildSystemBlocks(vendors)
  const userPrompt = buildCompanyPrompt(company)

  async function callClaude(retryWithStricterPrompt = false): Promise<MatchResult> {
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      {
        role: "user",
        content: retryWithStricterPrompt
          ? `${userPrompt}\n\nIMPORTANT: Return ONLY valid JSON. No other text.`
          : userPrompt,
      },
    ]

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: systemBlocks,
      messages,
      betas: ["prompt-caching-2024-07-31"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = response as any
    const content = msg.content[0]
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude")
    }

    // Extract JSON from response (handle case where Claude wraps in markdown)
    let jsonText = (content.text as string).trim()
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    }

    const parsed = JSON.parse(jsonText)
    const validated = ReportDataSchema.parse(parsed)

    const usage = msg.usage as {
      input_tokens: number
      output_tokens: number
      cache_read_input_tokens?: number
      cache_creation_input_tokens?: number
    }

    return {
      report: validated,
      usage: {
        inputTokens: usage.input_tokens,
        outputTokens: usage.output_tokens,
        cacheReadTokens: usage.cache_read_input_tokens ?? 0,
        cacheWriteTokens: usage.cache_creation_input_tokens ?? 0,
      },
    }
  }

  try {
    return await callClaude(false)
  } catch (firstError) {
    // Retry once with stricter prompt on JSON parse errors
    if (
      firstError instanceof SyntaxError ||
      (firstError instanceof z.ZodError)
    ) {
      try {
        return await callClaude(true)
      } catch {
        throw firstError
      }
    }
    throw firstError
  }
}
