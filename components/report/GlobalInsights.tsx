import type { ReportData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface Props {
  report: ReportData
}

export function GlobalInsights({ report }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Your Partnership Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.globalStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Areas to Strengthen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {report.globalGaps.length > 0 ? (
            <ul className="space-y-2">
              {report.globalGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-amber-700 italic">
              No major cross-vendor gaps identified. You are well-positioned.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
