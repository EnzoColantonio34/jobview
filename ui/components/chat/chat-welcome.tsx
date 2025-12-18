"use client"

import { Star } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { useTranslation } from "react-i18next"

export function ChatWelcome() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-6">
      <div className={`${THEME_TEMPLATES.animation.fadeIn}`}>
        <div className="flex items-center justify-center">
        </div>
      </div>

      <div className={`space-y-3 text-center ${THEME_TEMPLATES.animation.slideInUp}`}>
        <h1 className={`text-4xl font-bold ${THEME_TEMPLATES.text.heading}`}>
          {t("chat.welcomeTitle")}
        </h1>
        <p className={`text-lg ${THEME_TEMPLATES.text.muted}`}>
          {t("chat.welcomeDescription")}
        </p>
      </div>
    </div>
  )
}
