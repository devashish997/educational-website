"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { Code2, Sparkles, Zap, Brain, Cpu, Terminal, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/translations"

export default function WelcomePage() {
  const router = useRouter()
  const { language } = useLanguage()

  const t = (key: string) => getTranslation(language, key as any)

  return (
    <div className="min-h-screen bg-background code-pattern relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="fixed top-6 right-6 z-[9999]">
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            {/* Icon Group */}
            <div className="flex items-center justify-center gap-6 mb-8 animate-slide-in">
              <div className="p-4 bg-card rounded-2xl border-2 border-primary/40 animate-pulse-glow">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <div
                className="p-4 bg-card rounded-2xl border-2 border-secondary/40 animate-pulse-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <div
                className="p-4 bg-card rounded-2xl border-2 border-accent/40 animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              >
                <Zap className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg md:text-xl text-muted-foreground font-mono">{t("welcome")}</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="gradient-text">{t("learnCS")}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed animate-slide-in"
              style={{ animationDelay: "0.4s" }}
            >
              {t("tagline")}
            </p>

            {/* CTA Button */}
            <div className="pt-8 animate-slide-in" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                onClick={() => router.push("/difficulty")}
                className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                {t("startLearning")}
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Why Learn CS Section */}
          <div className="animate-slide-in" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">{t("whyLearnCS")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <Brain className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t("problemSolving")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("problemSolvingDesc")}</p>
              </Card>
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <Cpu className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t("creativity")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("creativityDesc")}</p>
              </Card>
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <Terminal className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t("careerOpportunities")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("careerDesc")}</p>
              </Card>
            </div>
          </div>

          {/* Games Section */}
          <div className="animate-slide-in" style={{ animationDelay: "1s" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">{t("exploreGames")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🐼</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t("bugHunt")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{t("bugHuntDesc")}</p>
                <div className="pt-2 pb-2 px-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-xs text-accent font-semibold">{t("bugHuntLearn")}</p>
                </div>
              </Card>
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t("binaryChallenge")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{t("binaryChallengeDesc")}</p>
                <div className="pt-2 pb-2 px-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-xs text-accent font-semibold">{t("binaryChallengeLearn")}</p>
                </div>
              </Card>
              <Card className="p-6 bg-card/60 backdrop-blur-sm border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🐭</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t("codeQuiz")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{t("codeQuizDesc")}</p>
                <div className="pt-2 pb-2 px-3 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-xs text-accent font-semibold">{t("codeQuizLearn")}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="animate-slide-in" style={{ animationDelay: "1.2s" }}>
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-2 border-accent/30">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-bold text-foreground">{t("funFacts")}</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{t("fact1")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{t("fact2")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{t("fact3")}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Decorative Code Snippet */}
          <div
            className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-xl max-w-md mx-auto text-left font-mono text-sm animate-slide-in"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <code className="text-muted-foreground">
              <span className="text-secondary">function</span> <span className="text-primary">startLearning</span>
              <span className="text-foreground">() {"{"}</span>
              <br />
              <span className="ml-4 text-foreground">return</span> <span className="text-accent">"Let's code!"</span>
              <span className="text-foreground">;</span>
              <br />
              <span className="text-foreground">{"}"}</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
