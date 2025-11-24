"use client"

import { Star } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-6">
      <div className={`${THEME_TEMPLATES.animation.fadeIn}`}>
        <div className="flex items-center justify-center">
        </div>
      </div>

      <div className={`space-y-3 text-center ${THEME_TEMPLATES.animation.slideInUp}`}>
        <h1 className={`text-4xl font-bold ${THEME_TEMPLATES.text.heading}`}>
          Prêt pour votre entretien ?
        </h1>
        <p className={`text-lg ${THEME_TEMPLATES.text.muted}`}>
          Expliquez-moi le contexte de votre entretien et je vous poserai des questions pour vous aider à vous préparer.
        </p>
      </div>
    </div>
  )
}
