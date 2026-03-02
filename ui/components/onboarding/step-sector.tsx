"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SECTOR_KEYS } from "./onboarding-types"
import { StepHeader } from "./step-header"
import { Briefcase, Search } from "lucide-react"

interface StepSectorProps {
  value: string
  onChange: (value: string) => void
}

export function StepSector({ value, onChange }: StepSectorProps) {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")

  const sectors = SECTOR_KEYS.map(key => ({ key, label: t(`onboarding.sectors.${key}`) }))
  const selectedSector = sectors.find((sector) => sector.key === value)
  const filtered = sectors.filter((s) => s.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-fade-in">
      <StepHeader
        icon={Briefcase}
        title={t("onboarding.stepSector.title")}
        description={t("onboarding.stepSector.description")}
      />

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("onboarding.stepSector.placeholder")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          className="pl-10 h-11"
        />
      </div>

      {selectedSector ? (
        <p className="text-center text-sm text-muted-foreground">
          {t("onboarding.stepSector.selected", { sector: selectedSector.label })}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
        {filtered.map((sector) => (
          <button
            key={sector.key}
            type="button"
            onClick={() => {
              onChange(sector.key)
              setSearch("")
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
              value === sector.key
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5",
            )}
          >
            {sector.label}
          </button>
        ))}
      </div>
    </div>
  )
}
