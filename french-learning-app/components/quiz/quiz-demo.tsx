"use client"

import { useState } from "react"
import QuizCard from "./quiz-card"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/types"

// Sample question for demo
const sampleQuestion: Question = {
  id: "demo-1",
  french_word: "Bonjour",
  english_translation: "Hello",
  options: ["Hello", "Goodbye", "Please", "Thank you"],
  correct_answer: "Hello",
  difficulty_level: "A1",
  category: "greetings",
  created_at: new Date().toISOString(),
}

export default function QuizDemo() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswerSelect = (answer: string, isCorrect: boolean) => {
    setSelectedAnswer(answer)
    setIsAnswered(true)
    // Show feedback after a brief delay
    setTimeout(() => {
      setShowFeedback(true)
    }, 500)
  }

  const resetDemo = () => {
    setSelectedAnswer("")
    setShowFeedback(false)
    setIsAnswered(false)
  }

  return (
    <div className="space-y-6">
      <QuizCard
        question={sampleQuestion}
        questionNumber={1}
        totalQuestions={10}
        onAnswerSelect={handleAnswerSelect}
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
      />

      {showFeedback && (
        <div className="text-center">
          <Button onClick={resetDemo} className="bg-emerald-600 hover:bg-emerald-700">
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
