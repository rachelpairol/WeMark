"use client"

import { useI18n, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ]

  return (
    <div className="flex items-center rounded-full border border-border bg-secondary/50 p-0.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full transition-all",
            locale === lang.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${lang.code === "en" ? "English" : "Spanish"}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
