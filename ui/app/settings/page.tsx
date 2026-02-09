"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Settings } from "@/components/settings/settings-page"
import { useTranslation } from "react-i18next"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function SettingsPage() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-5xl py-8 px-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
          <Settings />
        </div>
      </div>
    </AuthGuard>
  )
}
