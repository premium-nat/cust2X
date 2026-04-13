"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, KeyRound } from "lucide-react"

export function SetupForm() {
  const router = useRouter()
  const [key, setKey] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const res = await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: key.trim() }),
    })

    const data = await res.json()

    if (!res.ok) {
      setStatus("error")
      setError(data.error ?? "Something went wrong")
      return
    }

    setStatus("success")
    setTimeout(() => router.push("/"), 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="apiKey">Anthropic API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="sk-ant-..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          disabled={status === "loading" || status === "success"}
          autoComplete="off"
        />
        <p className="text-xs text-slate-400">
          Get your key at <strong>console.anthropic.com</strong> → API Keys
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {status === "success" ? (
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          Key saved! Redirecting...
        </div>
      ) : (
        <Button
          type="submit"
          disabled={!key.trim() || status === "loading"}
          className="w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verifying key...
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4 mr-2" />
              Save API Key
            </>
          )}
        </Button>
      )}
    </form>
  )
}
