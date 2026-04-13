"use client"

import { useReducer, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Step1Company } from "./Step1Company"
import { Step2Maturity } from "./Step2Maturity"
import { Step3GTM } from "./Step3GTM"
import { Step4Goals } from "./Step4Goals"
import type { CompanyProfileInput } from "@/lib/types"
import { Loader2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

type State = {
  step: 1 | 2 | 3 | 4
  data: Partial<CompanyProfileInput>
  errors: Partial<Record<keyof CompanyProfileInput, string>>
  isSubmitting: boolean
  submitError: string | null
}

type Action =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "UPDATE_FIELD"; field: keyof CompanyProfileInput; value: string | number }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof CompanyProfileInput, string>> }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_ERROR"; error: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(4, state.step + 1) as 1 | 2 | 3 | 4, errors: {} }
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) as 1 | 2 | 3 | 4, errors: {} }
    case "UPDATE_FIELD":
      return { ...state, data: { ...state.data, [action.field]: action.value } }
    case "SET_ERRORS":
      return { ...state, errors: action.errors }
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitError: null }
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, submitError: action.error }
    default:
      return state
  }
}

const STEP_TITLES = [
  "Company Information",
  "AI Maturity & Capabilities",
  "GTM Model & Client Base",
  "Partnership Goals",
]

function validateStep(step: number, data: Partial<CompanyProfileInput>): Partial<Record<keyof CompanyProfileInput, string>> {
  const errors: Partial<Record<keyof CompanyProfileInput, string>> = {}

  if (step === 1) {
    if (!data.name?.trim()) errors.name = "Company name is required"
    if (!data.website?.trim()) errors.website = "Website is required"
    if (!data.industry) errors.industry = "Please select an industry"
    if (!data.employeeCount || data.employeeCount < 1)
      errors.employeeCount = "Please enter your employee count"
  }

  if (step === 2) {
    if (!data.aiMaturityLevel) errors.aiMaturityLevel = "Please select your AI maturity level"
    if (!data.capabilities?.trim() || data.capabilities.length < 10)
      errors.capabilities = "Please describe your capabilities (at least 10 characters)"
  }

  if (step === 3) {
    if (!data.gtmModel) errors.gtmModel = "Please select your GTM model"
    if (!data.clientBase?.trim() || data.clientBase.length < 10)
      errors.clientBase = "Please describe your client base (at least 10 characters)"
  }

  if (step === 4) {
    if (!data.partnershipGoals?.trim() || data.partnershipGoals.length < 10)
      errors.partnershipGoals = "Please describe your partnership goals"
    if (!data.contactEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.contactEmail = "Please enter a valid email address"
  }

  return errors
}

export function ProfileWizard() {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, {
    step: 1,
    data: {},
    errors: {},
    isSubmitting: false,
    submitError: null,
  })

  const handleChange = useCallback(
    (field: keyof CompanyProfileInput, value: string | number) => {
      dispatch({ type: "UPDATE_FIELD", field, value })
    },
    []
  )

  function handleNext() {
    const errors = validateStep(state.step, state.data)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors })
      return
    }
    dispatch({ type: "NEXT_STEP" })
  }

  async function handleSubmit() {
    const errors = validateStep(4, state.data)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors })
      return
    }

    dispatch({ type: "SUBMIT_START" })

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.setupRequired) {
          router.push("/setup")
          return
        }
        throw new Error(result.error ?? "Failed to generate report")
      }

      router.push(`/report/${result.reportId}`)
    } catch (error) {
      dispatch({
        type: "SUBMIT_ERROR",
        error: error instanceof Error ? error.message : "Something went wrong",
      })
    }
  }

  const progressValue = ((state.step - 1) / 3) * 100

  const stepProps = {
    data: state.data,
    onChange: handleChange,
    errors: state.errors,
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Step {state.step} of 4
          </span>
          <span className="text-sm text-slate-400">
            {STEP_TITLES[state.step - 1]}
          </span>
        </div>
        <Progress value={progressValue} className="h-1.5" />
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {STEP_TITLES[state.step - 1]}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {state.step === 1 && "Tell us about your company."}
          {state.step === 2 && "Help us understand where you are on the AI journey."}
          {state.step === 3 && "How do you reach and serve your clients?"}
          {state.step === 4 && "What do you want to achieve through an AI vendor partnership?"}
        </p>

        {state.step === 1 && <Step1Company {...stepProps} />}
        {state.step === 2 && <Step2Maturity {...stepProps} />}
        {state.step === 3 && <Step3GTM {...stepProps} />}
        {state.step === 4 && <Step4Goals {...stepProps} />}

        {state.submitError && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {state.submitError}
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          {state.step > 1 ? (
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              disabled={state.isSubmitting}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {state.step < 4 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={state.isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 min-w-[180px]"
            >
              {state.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get My Report
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`h-2 rounded-full transition-all ${
              n === state.step
                ? "w-6 bg-blue-600"
                : n < state.step
                ? "w-2 bg-blue-300"
                : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
