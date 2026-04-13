import { NextRequest } from "next/server"
import { saveAnthropicKey, getAnthropicKey } from "@/lib/config"
import Anthropic from "@anthropic-ai/sdk"

export async function GET() {
  const key = await getAnthropicKey()
  return Response.json({ configured: !!key })
}

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json()

  if (!apiKey || !apiKey.startsWith("sk-ant-")) {
    return Response.json(
      { error: "Invalid API key — Anthropic keys start with sk-ant-" },
      { status: 400 }
    )
  }

  // Verify the key works before saving
  try {
    const client = new Anthropic({ apiKey })
    await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 5,
      messages: [{ role: "user", content: "hi" }],
    })
  } catch {
    return Response.json(
      { error: "Key validation failed — check your key and try again" },
      { status: 400 }
    )
  }

  await saveAnthropicKey(apiKey)
  return Response.json({ success: true })
}
