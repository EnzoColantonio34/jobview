"use client"

import { useTranslation } from "react-i18next"
import { DIPLOMA_LEVEL_KEYS } from "./onboarding-types"
import { StepHeader } from "./step-header"
import { SelectableOption } from "./selectable-option"
import { GraduationCap } from "lucide-react"

interface StepDiplomaProps {
  value: string
  onChange: (value: string) => void
}

export function StepDiploma({ value, onChange }: StepDiplomaProps) {
  const { t } = useTranslation()

  const diplomaLevels = DIPLOMA_LEVEL_KEYS.map(key => ({
    value: key,
    label: t(`onboarding.stepDiploma.levels.${key}`),
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={GraduationCap}
        title={t("onboarding.stepDiploma.title")}
        description={t("onboarding.stepDiploma.description")}
      />

      <div className="max-w-md mx-auto space-y-3">
        {diplomaLevels.map((level) => (
          <SelectableOption
            key={level.value}
            selected={value === level.value}
            onClick={() => onChange(level.value)}
            label={level.label}
          />
        ))}
      </div>
    </div>
  )
}
