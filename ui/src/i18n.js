"use client"

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

import fr from "./locales/fr.json";
import en from "./locales/en.json";



const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("i18nextLng")
    if (stored) return stored
    if (navigator.language) return navigator.language.split("-")[0]
  }
  return "fr"
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: "fr",
    detection: {
      order: ["localStorage", "navigator"], 
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n;