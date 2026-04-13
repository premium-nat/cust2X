import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function formatScore(score: number): string {
  return `${score}/100`
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-blue-600"
  if (score >= 40) return "text-amber-600"
  return "text-red-600"
}

export function getScoreBg(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-blue-500"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent Fit"
  if (score >= 60) return "Good Fit"
  if (score >= 40) return "Moderate Fit"
  return "Poor Fit"
}
