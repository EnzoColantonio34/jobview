"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Settings } from "@/components/settings/settings-page"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <Settings />
      </div>
    </div>
  )
}
