"use client"

import { useTranslation } from "react-i18next"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { StepHeader } from "./step-header"
import { Heart } from "lucide-react"

interface StepSituationProps {
  value: string
  onChange: (value: string) => void
}

export function StepSituation({ value, onChange }: StepSituationProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={Heart}
        title={t("onboarding.stepSituation.title")}
        description={t("onboarding.stepSituation.description")}
      />

      <div className="max-w-lg mx-auto space-y-4">
        <Card className="bg-muted/30 py-4">
          <CardContent>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("onboarding.stepSituation.privacyNotice")}
            </p>
          </CardContent>
        </Card>

        <Textarea
          placeholder={t("onboarding.stepSituation.placeholder")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none text-sm"
        />
      </div>
    </div>
  )
}
