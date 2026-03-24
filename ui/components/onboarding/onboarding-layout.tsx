"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { AppLogo } from "@/components/layout/app-logo"
import { OnboardingStepper } from "./onboarding-stepper"
import { ONBOARDING_STEPS } from "./onboarding-types"

interface OnboardingLayoutProps {
  currentStep: number
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
  centerContent?: boolean
}

export function OnboardingLayout({
  currentStep,
  subtitle,
  children,
  footer,
  centerContent = false,
}: OnboardingLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
            <AppLogo />
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </header>

        <div className="border-b border-border bg-card/30">
          <div className="max-w-2xl mx-auto px-6 py-5">
            <OnboardingStepper steps={[...ONBOARDING_STEPS]} currentStep={currentStep} />
          </div>
        </div>

        <main
          className={`flex-1 flex ${centerContent ? "items-center" : "items-start pt-10"} justify-center p-6 overflow-auto`}
        >
          <div className="w-full max-w-3xl">{children}</div>
        </main>

        {footer && (
          <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto px-6 py-4">{footer}</div>
          </footer>
        )}
      </div>
    </AuthGuard>
  )
}
