export interface OnboardingData {
  sector: string
  diplomaLevel: string
  yearsExperience: string
  description: string
  city: string
  mobility: string
  specialSituation: string
}

export const ONBOARDING_STEPS = [
  { key: "sector" },
  { key: "diploma" },
  { key: "experience" },
  { key: "profile" },
  { key: "location" },
  { key: "situation" },
] as const

export const SECTOR_KEYS = [
  "it", "hr", "marketing", "finance", "sales", "construction",
  "health", "education", "logistics", "hospitality", "legal",
  "engineering", "design", "agriculture",
] as const

export const DIPLOMA_LEVEL_KEYS = [
  "none", "cap-bep", "bac", "bac+2", "bac+3", "bac+5", "bac+8",
] as const

export const EXPERIENCE_KEYS = ["0", "1", "1-3", "3-5", "5-10", "10+"] as const

export const MOBILITY_KEYS = [
  "car", "public-transport", "bike", "remote", "flexible",
] as const

export const MOBILITY_ICONS: Record<(typeof MOBILITY_KEYS)[number], string> = {
  "car": "🚗",
  "public-transport": "🚌",
  "bike": "🚲",
  "remote": "🏠",
  "flexible": "✨",
}
