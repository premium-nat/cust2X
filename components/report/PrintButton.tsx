"use client"

import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 no-print"
    >
      <Printer className="h-4 w-4" />
      Print / Save PDF
    </button>
  )
}
