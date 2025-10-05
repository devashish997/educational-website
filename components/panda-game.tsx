"use client"

import { useEffect, useState } from "react"

interface PandaGameProps {
  action: "climbing" | "switching" | "falling"
}

export function PandaGame({ action }: PandaGameProps) {
  const [pandaSide, setPandaSide] = useState<"left" | "right">("left")
  const [pandaHeight, setPandaHeight] = useState(10)
  const [bugPosition, setBugPosition] = useState(50)

  useEffect(() => {
    if (action === "switching") {
      setPandaSide((prev) => (prev === "left" ? "right" : "left"))
      setPandaHeight((prev) => Math.min(prev + 15, 80))
    } else if (action === "falling") {
      setPandaHeight(10)
    } else if (action === "climbing") {
      // Slowly climb
      const interval = setInterval(() => {
        setPandaHeight((prev) => Math.min(prev + 2, 80))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [action])

  useEffect(() => {
    // Bug moves up and down
    const interval = setInterval(() => {
      setBugPosition((prev) => (prev === 50 ? 60 : 50))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-md h-[500px] bg-gradient-to-b from-secondary/10 to-primary/10 rounded-2xl border-2 border-primary/20 overflow-hidden">
      {/* Bamboo Pole */}
      <div className="absolute left-1/2 top-0 bottom-0 w-16 -translate-x-1/2 bg-gradient-to-b from-secondary/40 to-secondary/60 rounded-full border-4 border-secondary/30">
        {/* Bamboo segments */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute left-0 right-0 h-1 bg-secondary/80" style={{ top: `${i * 12.5}%` }} />
        ))}
      </div>

      {/* Bug */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          [pandaSide]: "calc(50% + 40px)",
          top: `${bugPosition}%`,
        }}
      >
        <div className="relative animate-float">
          <div className="text-4xl">🐛</div>
          <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full" />
        </div>
      </div>

      {/* Panda */}
      <div
        className={`absolute transition-all duration-500 ${action === "falling" ? "duration-700 ease-in" : "ease-out"}`}
        style={{
          [pandaSide]: "calc(50% + 20px)",
          bottom: `${pandaHeight}%`,
        }}
      >
        <div className="relative">
          <div className="text-5xl">{action === "falling" ? "😵" : "🐼"}</div>
          {action === "switching" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce">✨</div>
          )}
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent" />

      {/* Score indicator */}
      <div className="absolute top-4 left-4 right-4 flex justify-between text-xs font-mono text-muted-foreground">
        <span>Height: {Math.round(pandaHeight)}%</span>
        <span>Side: {pandaSide}</span>
      </div>
    </div>
  )
}
