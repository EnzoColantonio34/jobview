"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import i18n from "@/src/i18n"

export function LanguageSettings() {

  const { t, i18n: i18nextInstance } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          {t("settings.language.interfaceTitle")}
        </CardTitle>
        <CardDescription>
          {t("settings.language.interfaceDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="language">{t("settings.language.interfaceTitle")}</Label>
          <Select
            value={i18nextInstance.language}
            onValueChange={(lang) => {
              i18n.changeLanguage(lang)
              if (typeof window !== "undefined") {
                localStorage.setItem("i18nextLng", lang)
              }
            }}
          >
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Sélectionnez une langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">🇫🇷 {t("settings.language.french")}</SelectItem>
              <SelectItem value="en">🇬🇧 {t("settings.language.english")}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {t("settings.language.applyInfo")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
