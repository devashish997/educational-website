"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy } from "lucide-react"
import { PandaGame } from "@/components/panda-game"
import { questions } from "@/lib/questions"

export default function BugHuntPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = searchParams.get("difficulty") || "easy"

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameState, setGameState] = useState<"playing" | "correct" | "wrong" | "timeout" | "finished">("playing")
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [pandaAction, setPandaAction] = useState<"climbing" | "switching" | "falling">("climbing")

  const difficultyQuestions = questions[difficulty as keyof typeof questions] || questions.easy
  const question = difficultyQuestions[currentQuestion]

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing" || timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, gameState])

  const handleTimeout = () => {
    setGameState("timeout")
    setPandaAction("falling")
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const handleAnswer = (answerIndex: number) => {
    if (gameState !== "playing") return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === question.correct

    if (isCorrect) {
      setGameState("correct")
      setPandaAction("switching")
      setScore((prev) => prev + 1)
    } else {
      setGameState("wrong")
      setPandaAction("falling")
    }

    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 >= difficultyQuestions.length) {
      setGameState("finished")
      return
    }

    setCurrentQuestion((prev) => prev + 1)
    setTimeLeft(10)
    setGameState("playing")
    setSelectedAnswer(null)
    setPandaAction("climbing")
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(10)
    setGameState("playing")
    setSelectedAnswer(null)
    setPandaAction("climbing")
  }

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-background code-pattern flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/40 text-center space-y-6">
          <Trophy className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary">{score}</p>
            <p className="text-muted-foreground">out of {difficultyQuestions.length} questions correct</p>
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
    <div className="min-h-screen bg-background code-pattern">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-primary/20">
        <Button variant="ghost" onClick={() => router.push("/difficulty")} className="text-foreground">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">Score:</span>{" "}
            <span className="text-primary font-bold">{score}</span>
          </div>
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">Question:</span>{" "}
            <span className="text-foreground font-bold">
              {currentQuestion + 1}/{difficultyQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
        {/* Left Side - Question */}
        <div className="flex flex-col items-center justify-center p-8 bg-card/30">
          <div className="max-w-xl w-full space-y-6">
            {/* Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-muted-foreground">Time Remaining</span>
                <span className={`font-bold ${timeLeft <= 3 ? "text-destructive" : "text-primary"}`}>{timeLeft}s</span>
              </div>
              <Progress value={(timeLeft / 10) * 100} className="h-2" />
            </div>

            {/* Question */}
            <Card className="p-6 bg-card border-2 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4 leading-relaxed">{question.question}</h3>
            </Card>

            {/* Answers */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct
                const showResult = gameState !== "playing"

                let buttonClass = "w-full justify-start text-left h-auto py-4 px-6 border-2 transition-all"

                if (showResult) {
                  if (isCorrect) {
                    buttonClass += " bg-primary/20 border-primary text-primary"
                  } else if (isSelected && !isCorrect) {
                    buttonClass += " bg-destructive/20 border-destructive text-destructive"
                  } else {
                    buttonClass += " border-muted"
                  }
                } else {
                  buttonClass += " border-primary/20 hover:border-primary/60 hover:bg-primary/10"
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={gameState !== "playing"}
                    className={buttonClass}
                    variant="outline"
                  >
                    <span className="font-mono mr-3 text-primary font-bold">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-foreground">{option}</span>
                  </Button>
                )
              })}
            </div>

            {/* Feedback */}
            {gameState !== "playing" && (
              <div className="text-center animate-slide-in">
                {gameState === "correct" && (
                  <p className="text-lg font-bold text-primary">Correct! Panda switched sides!</p>
                )}
                {gameState === "wrong" && (
                  <p className="text-lg font-bold text-destructive">Wrong answer! Panda fell!</p>
                )}
                {gameState === "timeout" && (
                  <p className="text-lg font-bold text-destructive">Time's up! Panda fell!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Panda Animation */}
        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <PandaGame action={pandaAction} />
        </div>
      </div>
    </div>
  )
}
