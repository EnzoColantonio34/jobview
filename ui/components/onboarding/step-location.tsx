"use client"

import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { MOBILITY_KEYS, MOBILITY_ICONS } from "./onboarding-types"
import { StepHeader } from "./step-header"
import { SelectableOption } from "./selectable-option"
import { MapPin } from "lucide-react"

interface StepLocationProps {
  city: string
  mobility: string
  onCityChange: (value: string) => void
  onMobilityChange: (value: string) => void
}

export function StepLocation({ city, mobility, onCityChange, onMobilityChange }: StepLocationProps) {
  const { t } = useTranslation()

  const mobilityOptions = MOBILITY_KEYS.map(key => ({
    value: key,
    label: t(`onboarding.stepLocation.mobilityOptions.${key}`),
    icon: MOBILITY_ICONS[key],
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={MapPin}
        title={t("onboarding.stepLocation.title")}
        description={t("onboarding.stepLocation.description")}
      />

      <div className="max-w-md mx-auto space-y-2">
        <Label>{t("onboarding.stepLocation.cityLabel")}</Label>
        <InputGroup className="h-11">
          <InputGroupAddon align="inline-start">
            <MapPin className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={t("onboarding.stepLocation.cityPlaceholder")}
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <Label>{t("onboarding.stepLocation.mobilityLabel")}</Label>
        <div className="grid grid-cols-1 gap-2">
          {mobilityOptions.map((opt) => (
            <SelectableOption
              key={opt.value}
              selected={mobility === opt.value}
              onClick={() => onMobilityChange(opt.value)}
              label={opt.label}
              icon={opt.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
