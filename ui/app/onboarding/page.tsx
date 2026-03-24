"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { StepSector } from "@/components/onboarding/step-sector"
import { StepDiploma } from "@/components/onboarding/step-diploma"
import { StepExperience } from "@/components/onboarding/step-experience"
import { StepDescription } from "@/components/onboarding/step-description"
import { StepLocation } from "@/components/onboarding/step-location"
import { StepSituation } from "@/components/onboarding/step-situation"
import { StepComplete } from "@/components/onboarding/step-complete"
import { ONBOARDING_STEPS, type OnboardingData } from "@/components/onboarding/onboarding-types"
import { ApiError, userContextsApi } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"

const INITIAL_DATA: OnboardingData = {
  sector: "",
  diplomaLevel: "",
  yearsExperience: "",
  description: "",
  city: "",
  mobility: "",
  specialSituation: "",
}

export default function OnboardingPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { markContextCompleted } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)

  const totalSteps = ONBOARDING_STEPS.length
  const isLastStep = currentStep === totalSteps - 1

  const updateField = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const canContinue = (): boolean => {
    switch (currentStep) {
      case 0: return data.sector.trim().length > 0
      case 1: return data.diplomaLevel.length > 0
      case 2: return data.yearsExperience.length > 0
      case 3: return data.description.trim().length > 0
      case 4: return data.city.trim().length > 0 && data.mobility.length > 0
      case 5: return true
      default: return false
    }
  }

  const handleNext = async () => {
    if (isLastStep) {
      try {
        setIsLoading(true);
        await userContextsApi.save({
          industry: data.sector,
          degree: data.diplomaLevel,
          experienceYears: data.yearsExperience,
          careerSummary: data.description,
          location: data.city,
          mobilityType: data.mobility,
          specialSituationNote: data.specialSituation,
        });

        setIsComplete(true);
      } catch (error) {
        console.error("Failed to save onboarding data:", error);

        if (error instanceof ApiError && error.status === 401) {
          toast({
            title: t("onboarding.feedback.sessionExpiredTitle"),
            description: t("onboarding.feedback.sessionExpiredDescription"),
            variant: "destructive",
          });
          router.replace("/auth");
          return;
        }

        toast({
          title: t("onboarding.feedback.saveErrorTitle"),
          description: t("onboarding.feedback.saveErrorDescription"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepSector value={data.sector} onChange={(v) => updateField("sector", v)} />
      case 1: return <StepDiploma value={data.diplomaLevel} onChange={(v) => updateField("diplomaLevel", v)} />
      case 2: return <StepExperience value={data.yearsExperience} onChange={(v) => updateField("yearsExperience", v)} />
      case 3: return <StepDescription value={data.description} onChange={(v) => updateField("description", v)} />
      case 4: return (
        <StepLocation
          city={data.city}
          mobility={data.mobility}
          onCityChange={(v) => updateField("city", v)}
          onMobilityChange={(v) => updateField("mobility", v)}
        />
      )
      case 5: return <StepSituation value={data.specialSituation} onChange={(v) => updateField("specialSituation", v)} />
      default: return null
    }
  }

  if (isComplete) {
    return (
      <OnboardingLayout
        currentStep={totalSteps}
        subtitle={t("onboarding.header.subtitleComplete")}
        centerContent
      >
        <StepComplete
          onContinue={() => {
            markContextCompleted()
            router.push("/")
          }}
        />
      </OnboardingLayout>
    )
  }

  return (
    <OnboardingLayout
      currentStep={currentStep}
      subtitle={t("onboarding.header.subtitle")}
      footer={
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("onboarding.navigation.back")}
          </Button>

          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {totalSteps}
          </span>

          <Button onClick={handleNext} disabled={!canContinue() || isLoading} className="gap-2">
            {isLastStep ? (
              <>
                {isLoading ? t("onboarding.navigation.loading") : t("onboarding.navigation.finish")}
                {!isLoading && <Rocket className="h-4 w-4" />}
              </>
            ) : (
              <>
                {t("onboarding.navigation.continue")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      }
    >
      {renderStep()}
    </OnboardingLayout>
  )
}
