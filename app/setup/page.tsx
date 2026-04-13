export const dynamic = "force-dynamic"

import { SetupForm } from "./SetupForm"
import { getAnthropicKey } from "@/lib/config"
import { KeyRound, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function SetupPage() {
  const isConfigured = !!(await getAnthropicKey())

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <KeyRound className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">API Key Setup</h1>
              <p className="text-sm text-slate-500">Required to run AI matching</p>
            </div>
          </div>

          {isConfigured ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Anthropic API key is configured and ready.
              </div>
              <p className="text-sm text-slate-500">
                You can save a new key below to replace it.
              </p>
              <SetupForm />
              <div className="pt-2 text-center">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">← Back to home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Enter your Anthropic API key to enable the AI matching engine. The key is
                stored securely in the database — you only need to do this once.
              </p>
              <SetupForm />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
