import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/providers/theme-provider"
import { I18nProvider } from "@/providers/i18n-provider"
import { ClientOnly } from "@/components/client-only"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobView - Préparation d'entretiens",
  description: "Préparez-vous aux entretiens d'embauche avec JobView",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <I18nProvider>
            <ClientOnly>
              {children}
              <Analytics />
            </ClientOnly>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}