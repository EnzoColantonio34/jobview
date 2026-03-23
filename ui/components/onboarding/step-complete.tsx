"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import Confetti from "react-confetti"
import { Button } from "@/components/ui/button"
import { PartyPopper, ArrowRight } from "lucide-react"

const CONFETTI_DURATION = 5000
const CONFETTI_COLORS = ["#783ad6", "#c95fbf", "#1900ad", "#8d42d1", "#6b2fb8", "#fbbf24"]

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return size
}

interface StepCompleteProps {
  onContinue?: () => void
}

export function StepComplete({ onContinue }: StepCompleteProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={showConfetti ? 250 : 0}
        recycle={false}
        colors={CONFETTI_COLORS}
        gravity={0.15}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
      />

      <div className="space-y-8 animate-fade-in text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/25 animate-bounce-slow">
              <PartyPopper className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            {t("onboarding.complete.title")}
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            {t("onboarding.complete.description")}
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => {
            if (onContinue) {
              onContinue()
              return
            }

            router.push("/")
          }}
          className="gap-2 text-base px-8 shadow-lg shadow-primary/20"
        >
          {t("onboarding.complete.cta")}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
