"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Question } from "@/lib/types"
import { getEncouragingMessage, playFeedbackSound } from "@/utils/feedback-helpers"

interface QuizCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswerSelect: (selectedAnswer: string, isCorrect: boolean) => void
  showFeedback?: boolean
  selectedAnswer?: string
  isAnswered?: boolean
  currentStreak?: number
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
  showFeedback = false,
  selectedAnswer,
  isAnswered = false,
  currentStreak = 0,
}: QuizCardProps) {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<string | null>(selectedAnswer || null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  useEffect(() => {
    setLocalSelectedAnswer(selectedAnswer || null)
  }, [question.id, selectedAnswer])

  useEffect(() => {
    if (showFeedback && localSelectedAnswer) {
      const isCorrect = localSelectedAnswer === question.correct_answer
      setShowAnimation(true)
      setFeedbackMessage(getEncouragingMessage(isCorrect, currentStreak))

      // Play sound effect
      playFeedbackSound(isCorrect)

      // Reset animation after delay
      const timer = setTimeout(() => setShowAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showFeedback, localSelectedAnswer, question.correct_answer, currentStreak])

  const handleOptionClick = (option: string) => {
    if (isAnswered) return // Prevent changing answer after submission

    setLocalSelectedAnswer(option)
    const isCorrect = option === question.correct_answer
    onAnswerSelect(option, isCorrect)
  }

  const getOptionButtonStyle = (option: string) => {
    const isSelected = localSelectedAnswer === option
    const isCorrect = option === question.correct_answer

    if (!showFeedback) {
      // Before showing feedback - just highlight selected
      return isSelected
        ? "bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-100 transform scale-105"
        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:scale-102"
    }

    // After showing feedback - show correct/incorrect with animations
    if (isCorrect) {
      return `bg-emerald-100 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200 ${
        showAnimation ? "animate-pulse" : ""
      }`
    }

    if (isSelected && !isCorrect) {
      return `bg-red-100 border-red-400 text-red-800 ring-2 ring-red-200 ${showAnimation ? "animate-shake" : ""}`
    }

    return "bg-slate-50 border-slate-200 text-slate-500"
  }

  const getOptionIcon = (option: string) => {
    const isSelected = localSelectedAnswer === option
    const isCorrect = option === question.correct_answer

    if (!showFeedback) {
      return isSelected ? (
        <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center animate-scale-in">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-slate-300 transition-all hover:border-emerald-400" />
      )
    }

    // Show feedback icons with animations
    if (isCorrect) {
      return (
        <div
          className={`w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center ${
            showAnimation ? "animate-bounce" : ""
          }`}
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    }

    if (isSelected && !isCorrect) {
      return (
        <div
          className={`w-5 h-5 rounded-full bg-red-600 flex items-center justify-center ${
            showAnimation ? "animate-pulse" : ""
          }`}
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )
    }

    return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
  }

  const isCorrectAnswer = localSelectedAnswer === question.correct_answer

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
            {question.category}
          </Badge>
          <div className="flex items-center space-x-2">
            {currentStreak > 0 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">🔥 {currentStreak}</Badge>
            )}
            <Badge variant="outline" className="text-slate-600 border-slate-200">
              {questionNumber} / {totalQuestions}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-slate-800">What does this mean?</CardTitle>
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-100">
          <p className="text-4xl font-bold text-emerald-700 mb-2">{question.french_word}</p>
          <p className="text-sm text-slate-600 uppercase tracking-wide">French</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-center text-slate-600 font-medium mb-6">Choose the correct English translation:</p>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered && showFeedback}
              className={`${getOptionButtonStyle(
                option,
              )} justify-start text-left h-auto p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className="flex items-center space-x-4 w-full">
                {getOptionIcon(option)}
                <span className="text-lg font-medium flex-1">{option}</span>
                <span className="text-sm font-bold text-slate-400">{String.fromCharCode(65 + index)}</span>
              </div>
            </Button>
          ))}
        </div>

        {showFeedback && (
          <div
            className={`mt-6 p-4 rounded-lg border-l-4 transition-all duration-500 ${
              isCorrectAnswer
                ? "border-l-emerald-400 bg-emerald-50 animate-slide-in-up"
                : "border-l-red-400 bg-red-50 animate-slide-in-up"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isCorrectAnswer ? "bg-emerald-600" : "bg-red-600"
                } ${showAnimation ? "animate-bounce" : ""}`}
              >
                {isCorrectAnswer ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-semibold ${isCorrectAnswer ? "text-emerald-800" : "text-red-800"}`}>
                  {feedbackMessage}
                </p>
                <p className={`text-sm mt-1 ${isCorrectAnswer ? "text-emerald-700" : "text-red-700"}`}>
                  <span className="font-medium">"{question.french_word}"</span> means{" "}
                  <span className="font-medium">"{question.correct_answer}"</span> in English.
                </p>
                {!isCorrectAnswer && (
                  <p className="text-red-600 text-xs mt-2 italic">
                    💡 Try to remember: {question.french_word} = {question.correct_answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
