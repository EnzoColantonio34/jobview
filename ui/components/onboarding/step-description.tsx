"use client"

import { useTranslation } from "react-i18next"
import { Textarea } from "@/components/ui/textarea"
import { StepHeader } from "./step-header"
import { FileText } from "lucide-react"

const MAX_LENGTH = 500

interface StepDescriptionProps {
  value: string
  onChange: (value: string) => void
}

export function StepDescription({ value, onChange }: StepDescriptionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={FileText}
        title={t("onboarding.stepDescription.title")}
        description={t("onboarding.stepDescription.description")}
      />

      <div className="max-w-lg mx-auto space-y-2">
        <Textarea
          placeholder={t("onboarding.stepDescription.placeholder")}
          value={value}
          onChange={(e) => e.target.value.length <= MAX_LENGTH && onChange(e.target.value)}
          className="min-h-[160px] resize-none text-sm"
        />
        <p className="text-right text-xs text-muted-foreground">
          {value.length} / {MAX_LENGTH}
        </p>
      </div>
    </div>
  )
}
