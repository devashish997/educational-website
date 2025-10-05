"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { ArrowLeft, Gamepad2, Trophy, Target, Rocket } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/translations"

export default function DifficultyPage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const { language } = useLanguage()

  const t = (key: string) => getTranslation(language, key as any)

  const modes = [
    {
      id: "easy",
      title: t("beginner"),
      classes: `${t("class")} 6, 7, 8`,
      emoji: "🎯",
      desc: t("problemSolvingDesc"),
      icon: Target,
    },
    {
      id: "moderate",
      title: t("intermediate"),
      classes: `${t("class")} 9, 10`,
      emoji: "🚀",
      desc: t("creativityDesc"),
      icon: Rocket,
    },
    {
      id: "hard",
      title: t("advanced"),
      classes: `${t("class")} 11, 12`,
      emoji: "🏆",
      desc: t("careerDesc"),
      icon: Trophy,
    },
  ]

  const games = [
    {
      id: "bug-hunt",
      title: t("bugHunt"),
      desc: t("bugHuntDesc"),
      learn: t("bugHuntLearn"),
      emoji: "🐼",
      route: "/games/bug-hunt",
    },
    {
      id: "binary-challenge",
      title: t("binaryChallenge"),
      desc: t("binaryChallengeDesc"),
      learn: t("binaryChallengeLearn"),
      emoji: "🚀",
      route: "/games/binary-challenge",
    },
    {
      id: "code-quiz",
      title: t("codeQuiz"),
      desc: t("codeQuizDesc"),
      learn: t("codeQuizLearn"),
      emoji: "🐭",
      route: "/games/code-quiz",
    },
  ]

  return (
    <div className="min-h-screen bg-background code-pattern relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between p-6 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-foreground hover:text-primary hover:bg-card/50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t("backToMenu")}
        </Button>
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 pt-32">
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">{t("selectClass")}</h1>
          <p className="text-lg text-muted-foreground">{t("chooseLevel")}</p>
        </div>

        {!selectedMode && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {modes.map((mode, index) => {
              const Icon = mode.icon
              return (
                <Card
                  key={mode.id}
                  className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/70 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">{mode.emoji}</div>
                    <Icon className="w-10 h-10 mx-auto text-primary mb-2" />
                    <h3 className="text-2xl font-bold text-foreground">{mode.title}</h3>
                    <p className="text-lg text-primary font-semibold">{mode.classes}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
                    <div className="pt-4">
                      <Gamepad2 className="w-8 h-8 mx-auto text-secondary" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {selectedMode && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">{t("selectGame")}</h2>
              <Button
                variant="outline"
                onClick={() => setSelectedMode(null)}
                className="border-primary/30 hover:border-primary/70 hover:bg-card/50"
              >
                {t("backToMenu")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <Card
                  key={game.id}
                  className="p-6 bg-card/80 backdrop-blur-sm border-2 border-secondary/30 hover:border-secondary/70 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => router.push(`${game.route}?difficulty=${selectedMode}`)}
                >
                  <div className="space-y-4">
                    <div className="text-5xl mb-2">{game.emoji}</div>
                    <h3 className="text-xl font-bold text-foreground">{game.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{game.desc}</p>
                    <div className="pt-2 pb-2 px-3 bg-accent/10 rounded-lg border border-accent/30">
                      <p className="text-xs text-accent font-semibold">{game.learn}</p>
                    </div>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-lg">
                      {t("startLearning")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
