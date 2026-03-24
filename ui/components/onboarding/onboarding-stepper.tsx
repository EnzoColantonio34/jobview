"use client"

import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
  steps: { key: string }[]
  currentStep: number
}

export function OnboardingStepper({ steps, currentStep }: StepperProps) {
  const { t } = useTranslation()
  const maxStepIndex = Math.max(steps.length - 1, 0)
  const progressStep = Math.min(Math.max(currentStep, 0), maxStepIndex)

  const progressWidth =
    steps.length <= 1 || progressStep === 0
      ? "0%"
      : `calc(${(progressStep / maxStepIndex) * 100}% - 100% / ${steps.length})`

  return (
    <div className="w-full">
      {/* Step labels + progress bar */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-4 left-[calc(100%/(2*var(--steps)))] right-[calc(100%/(2*var(--steps)))] h-0.5 bg-border"
          style={{ "--steps": steps.length } as React.CSSProperties}
        />
        {/* Active line */}
        <div
          className="absolute top-4 left-[calc(100%/(2*var(--steps)))] h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-in-out"
          style={{
            "--steps": steps.length,
            width: progressWidth,
          } as React.CSSProperties}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isFuture = index > currentStep

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
              {/* Circle */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-background text-primary shadow-md shadow-primary/20",
                  isFuture && "border-border bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              {/* Label */}
              <span
                className={cn(
                  "text-[11px] font-medium text-center max-w-[80px] leading-tight hidden sm:block",
                  isCompleted && "text-primary",
                  isActive && "text-foreground",
                  isFuture && "text-muted-foreground"
                )}
              >
                {t(`onboarding.steps.${step.key}`)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
