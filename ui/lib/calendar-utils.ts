export const DAYS_OF_WEEK_KEYS = [
  "calendar.daysOfWeek.sunday",
  "calendar.daysOfWeek.monday",
  "calendar.daysOfWeek.tuesday",
  "calendar.daysOfWeek.wednesday",
  "calendar.daysOfWeek.thursday",
  "calendar.daysOfWeek.friday",
  "calendar.daysOfWeek.saturday",
] as const

export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

import i18n from "../src/i18n"

export function formatMonthYear(date: Date): string {
  // Utilise la langue courante d'i18next
  const lang = i18n.language || "fr"
  const locale = lang === "en" ? "en-GB" : "fr-FR"
  return date.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  })
}

export function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}
