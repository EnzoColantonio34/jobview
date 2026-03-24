"use client"

import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { EXPERIENCE_KEYS } from "./onboarding-types"
import { StepHeader } from "./step-header"
import { Clock } from "lucide-react"

interface StepExperienceProps {
  value: string
  onChange: (value: string) => void
}

export function StepExperience({ value, onChange }: StepExperienceProps) {
  const { t } = useTranslation()

  const options = EXPERIENCE_KEYS.map(key => ({
    value: key,
    label: t(`onboarding.stepExperience.options.${key}.label`),
    subtitle: t(`onboarding.stepExperience.options.${key}.subtitle`),
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={Clock}
        title={t("onboarding.stepExperience.title")}
        description={t("onboarding.stepExperience.description")}
      />

      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-5 rounded-xl border text-center transition-all duration-200",
              value === opt.value
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
            )}
          >
            <span className="text-sm font-semibold text-foreground">{opt.label}</span>
            <span className="text-xs text-muted-foreground">{opt.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
