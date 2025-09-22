"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Question } from "@/lib/types"
import { calculateScore } from "@/utils/quiz-helpers"

interface QuizAnswer {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
  answeredAt: Date
}

interface QuizResultsProps {
  answers: QuizAnswer[]
  questions: Question[]
  sessionId: string
  onRestart: () => void
  userId: string
}

export default function QuizResults({ answers, questions, sessionId, onRestart, userId }: QuizResultsProps) {
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length
  const totalQuestions = questions.length
  const scorePercentage = calculateScore(correctAnswers, totalQuestions)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent!", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
    if (score >= 60) return { text: "Good Job!", color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    return { text: "Keep Practicing!", color: "bg-red-100 text-red-800 border-red-200" }
  }

  const scoreBadge = getScoreBadge(scorePercentage)

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Results Header */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-slate-800">Quiz Complete!</CardTitle>
          <Badge className={scoreBadge.color}>{scoreBadge.text}</Badge>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(scorePercentage)}`}>{scorePercentage}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Correct</p>
              <p className="text-3xl font-bold text-emerald-600">{correctAnswers}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-3xl font-bold text-slate-600">{totalQuestions}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={onRestart} className="bg-emerald-600 hover:bg-emerald-700">
              Take Another Quiz
            </Button>
            <Button asChild variant="outline" className="border-emerald-200 text-emerald-700 bg-transparent">
              <Link href="/progress">View Progress</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Question Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question, index) => {
            const answer = answers[index]
            const isCorrect = answer?.isCorrect || false

            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-l-4 ${
                  isCorrect ? "border-l-emerald-400 bg-emerald-50" : "border-l-red-400 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">
                      {index + 1}. What does &quot;{question.french_word}&quot; mean?
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Your answer: <span className="font-medium">{answer?.selectedAnswer || "No answer"}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-slate-600">
                        Correct answer: <span className="font-medium text-emerald-700">{question.correct_answer}</span>
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCorrect ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  >
                    {isCorrect ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
