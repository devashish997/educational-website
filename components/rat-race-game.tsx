"use client"

import { useEffect, useState } from "react"

interface RatRaceGameProps {
  action: "running" | "jumping" | "falling"
  distance: number
}

export function RatRaceGame({ action, distance }: RatRaceGameProps) {
  const [roadOffset, setRoadOffset] = useState(0)
  const [potholes, setPotholes] = useState<number[]>([30, 60, 90])
  const [ratHeight, setRatHeight] = useState(0)

  // Animate road scrolling
  useEffect(() => {
    if (action !== "running" && action !== "jumping") return

    const interval = setInterval(() => {
      setRoadOffset((prev) => (prev + 2) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [action])

  // Handle jumping animation
  useEffect(() => {
    if (action === "jumping") {
      // Jump up
      setRatHeight(40)
      setTimeout(() => {
        // Come back down
        setRatHeight(0)
      }, 500)
    } else if (action === "falling") {
      setRatHeight(-20)
    } else {
      setRatHeight(0)
    }
  }, [action])

  // Generate new potholes as rat progresses
  useEffect(() => {
    const maxPothole = Math.max(...potholes)
    if (distance > maxPothole - 50) {
      setPotholes((prev) => [...prev, maxPothole + 30])
    }
  }, [distance, potholes])

  return (
    <div className="relative w-full max-w-md h-[400px] bg-gradient-to-b from-accent/10 to-secondary/10 rounded-2xl border-2 border-primary/20 overflow-hidden">
      {/* Sky/Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-accent/20">
        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-40"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 15}%`,
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-muted/40 to-muted/60 border-t-4 border-primary/30">
        {/* Road lines */}
        <div className="absolute top-1/2 left-0 right-0 h-1 flex gap-8 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-full w-12 bg-primary/40 transition-transform duration-100"
              style={{
                transform: `translateX(-${roadOffset}%)`,
              }}
            />
          ))}
        </div>

        {/* Potholes */}
        {potholes.map((potholeDistance, i) => {
          const relativePosition = ((potholeDistance - distance) / 100) * 100
          if (relativePosition < -10 || relativePosition > 110) return null

          return (
            <div
              key={i}
              className="absolute bottom-4 transition-all duration-100"
              style={{
                left: `${relativePosition}%`,
              }}
            >
              <div className="relative">
                <div className="w-16 h-12 bg-background/80 rounded-full border-4 border-destructive/60" />
                <div className="absolute inset-0 bg-destructive/20 blur-lg rounded-full" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Rat */}
      <div
        className="absolute left-1/4 transition-all duration-300"
        style={{
          bottom: `${120 + ratHeight}px`,
        }}
      >
        <div className="relative">
          <div className="text-5xl">{action === "falling" ? "😵" : action === "jumping" ? "🐭" : "🐭"}</div>
          {action === "jumping" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce">✨</div>
          )}
          {action === "running" && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Distance marker */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/40">
        <p className="text-xs text-muted-foreground font-mono">Distance</p>
        <p className="text-2xl font-bold text-primary font-mono">{distance}m</p>
      </div>

      {/* Action indicator */}
      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-secondary/40">
        <p className="text-xs text-muted-foreground font-mono">Status</p>
        <p className="text-sm font-bold text-secondary font-mono capitalize">{action}</p>
      </div>

      {/* Ground decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-primary/20 to-transparent" />
    </div>
  )
}
