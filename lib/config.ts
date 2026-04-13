import { prisma } from "./prisma"

export async function getAnthropicKey(): Promise<string | null> {
  // Env var takes priority (for production deployments)
  if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== "your-api-key-here") {
    return process.env.ANTHROPIC_API_KEY
  }
  // Fall back to DB-stored key
  const config = await prisma.config.findUnique({ where: { key: "ANTHROPIC_API_KEY" } })
  return config?.value ?? null
}

export async function saveAnthropicKey(key: string): Promise<void> {
  await prisma.config.upsert({
    where: { key: "ANTHROPIC_API_KEY" },
    update: { value: key },
    create: { key: "ANTHROPIC_API_KEY", value: key },
  })
}
