"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const languages = [
    { value: "english", label: "English", flag: "🇬🇧" },
    { value: "hindi", label: "हिंदी", flag: "🇮🇳" },
    { value: "odia", label: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ]

  const currentLanguage = languages.find((lang) => lang.value === language)

  const handleSelect = (value: string) => {
    setLanguage(value as any)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 rounded-lg transition-all duration-200 hover:scale-105"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{currentLanguage?.label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border-2 border-primary/30 rounded-lg shadow-xl shadow-primary/20 overflow-hidden z-[9999] animate-slide-in">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleSelect(lang.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                language === lang.value
                  ? "bg-primary/20 text-primary font-semibold"
                  : "hover:bg-primary/10 text-foreground"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
              {language === lang.value && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
