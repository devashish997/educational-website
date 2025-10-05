"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trophy, Zap } from "lucide-react"

interface Asteroid {
  id: number
  binary: string
  decimal: number
  x: number
  y: number
  speed: number
}

export default function BinaryChallengePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = searchParams.get("difficulty") || "easy"

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [inputValue, setInputValue] = useState("")
  const [gameState, setGameState] = useState<"playing" | "finished">("playing")
  const [nextId, setNextId] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  const maxBinary = difficulty === "easy" ? 15 : difficulty === "moderate" ? 31 : 63

  // Generate random binary number
  const generateAsteroid = (): Asteroid => {
    const decimal = Math.floor(Math.random() * maxBinary) + 1
    const binary = decimal.toString(2)
    return {
      id: nextId,
      binary,
      decimal,
      x: Math.random() * 80 + 10, // 10-90% of width
      y: -10,
      speed: difficulty === "easy" ? 0.5 : difficulty === "moderate" ? 0.8 : 1.2,
    }
  }

  // Initialize asteroids
  useEffect(() => {
    if (gameState !== "playing") return

    const initialAsteroids = [generateAsteroid()]
    setAsteroids(initialAsteroids)
    setNextId(1)
  }, [])

  // Spawn new asteroids
  useEffect(() => {
    if (gameState !== "playing") return

    const spawnInterval = setInterval(() => {
      if (asteroids.length < 3) {
        setAsteroids((prev) => [...prev, generateAsteroid()])
        setNextId((prev) => prev + 1)
      }
    }, 3000)

    return () => clearInterval(spawnInterval)
  }, [asteroids.length, gameState, nextId])

  // Move asteroids
  useEffect(() => {
    if (gameState !== "playing") return

    const moveInterval = setInterval(() => {
      setAsteroids((prev) => {
        const updated = prev.map((asteroid) => ({
          ...asteroid,
          y: asteroid.y + asteroid.speed,
        }))

        // Remove asteroids that reached bottom and decrease lives
        const remaining = updated.filter((asteroid) => {
          if (asteroid.y > 100) {
            setLives((l) => {
              const newLives = l - 1
              if (newLives <= 0) {
                setGameState("finished")
              }
              return newLives
            })
            return false
          }
          return true
        })

        return remaining
      })
    }, 50)

    return () => clearInterval(moveInterval)
  }, [gameState])

  const handleShoot = () => {
    const answer = Number.parseInt(inputValue)
    if (isNaN(answer)) return

    // Check if answer matches any asteroid
    const hitAsteroid = asteroids.find((a) => a.decimal === answer)

    if (hitAsteroid) {
      // Hit! Remove asteroid and increase score
      setAsteroids((prev) => prev.filter((a) => a.id !== hitAsteroid.id))
      setScore((prev) => prev + 1)
      setInputValue("")

      // Spawn new asteroid
      setTimeout(() => {
        setAsteroids((prev) => [...prev, generateAsteroid()])
        setNextId((prev) => prev + 1)
      }, 500)
    } else {
      // Miss - just clear input
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleShoot()
    }
  }

  const restartGame = () => {
    setScore(0)
    setLives(3)
    setAsteroids([generateAsteroid()])
    setNextId(1)
    setInputValue("")
    setGameState("playing")
  }

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background code-pattern flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/40 text-center space-y-6">
          <Trophy className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Game Over!</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary">{score}</p>
            <p className="text-muted-foreground">asteroids destroyed</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={restartGame} className="flex-1 bg-primary hover:bg-primary/90">
              Play Again
            </Button>
            <Button onClick={() => router.push("/difficulty")} variant="outline" className="flex-1">
              Back to Menu
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-primary/20">
        <Button variant="ghost" onClick={() => router.push("/difficulty")} className="text-foreground">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-6">
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">Score:</span>{" "}
            <span className="text-primary font-bold">{score}</span>
          </div>
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">Lives:</span>{" "}
            <span className="text-destructive font-bold">{"❤️".repeat(lives)}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-[calc(100vh-160px)] overflow-hidden" ref={canvasRef}>
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Asteroids */}
        {asteroids.map((asteroid) => (
          <div
            key={asteroid.id}
            className="absolute transition-all duration-100"
            style={{
              left: `${asteroid.x}%`,
              top: `${asteroid.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative animate-float">
              <div className="text-4xl">☄️</div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-primary/40 whitespace-nowrap">
                <span className="text-primary font-mono font-bold">{asteroid.binary}</span>
              </div>
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
            </div>
          </div>
        ))}

        {/* Spaceship */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="text-6xl animate-float">🚀</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-card/90 backdrop-blur-sm border-t border-primary/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter decimal value..."
                className="text-lg h-12 bg-background border-primary/40 focus:border-primary"
                autoFocus
              />
            </div>
            <Button
              onClick={handleShoot}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Shoot
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-3 font-mono">
            Convert binary to decimal and shoot the asteroids!
          </p>
        </div>
      </div>
    </div>
  )
}
