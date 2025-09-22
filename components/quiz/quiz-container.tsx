"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QuizCard from "./quiz-card"
import QuizResults from "./quiz-results"
import QuizHeader from "./quiz-header"
import QuizCardSkeleton from "./quiz-card-skeleton"
import StreakCelebration from "./streak-celebration"
import FeedbackToast from "./feedback-toast"
import type { Question } from "@/lib/types"
import { getRandomQuestions } from "@/utils/quiz-helpers"
import { QUIZ_CONFIG } from "@/lib/constants"

// Sample questions for demo
const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    french_word: "Bonjour",
    english_translation: "Hello",
    options: ["Good evening", "Hello", "Goodbye", "Thank you"],
    correct_answer: "Hello",
    difficulty_level: "A1",
    category: "greetings",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    french_word: "Au revoir",
    english_translation: "Goodbye",
    options: ["Hello", "Please", "Goodbye", "Excuse me"],
    correct_answer: "Goodbye",
    difficulty_level: "A1",
    category: "greetings",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    french_word: "Merci",
    english_translation: "Thank you",
    options: ["Please", "Thank you", "Sorry", "You're welcome"],
    correct_answer: "Thank you",
    difficulty_level: "A1",
    category: "politeness",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    french_word: "S'il vous plaît",
    english_translation: "Please",
    options: ["Thank you", "Excuse me", "Please", "Sorry"],
    correct_answer: "Please",
    difficulty_level: "A1",
    category: "politeness",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    french_word: "Excusez-moi",
    english_translation: "Excuse me",
    options: ["Sorry", "Excuse me", "Thank you", "Please"],
    correct_answer: "Excuse me",
    difficulty_level: "A1",
    category: "politeness",
    created_at: new Date().toISOString(),
  },
]

interface QuizAnswer {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
  answeredAt: Date
}

interface QuizContainerProps {
  userId: string
}

export default function QuizContainer({ userId }: QuizContainerProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [currentStreak, setCurrentStreak] = useState(0)
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)
  const [feedbackToast, setFeedbackToast] = useState<{
    message: string
    type: "success" | "error"
    show: boolean
  }>({ message: "", type: "success", show: false })

  // Initialize quiz with sample questions
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const selectedQuestions = getRandomQuestions(SAMPLE_QUESTIONS, QUIZ_CONFIG.QUESTIONS_PER_SESSION)
        setQuestions(selectedQuestions)
        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing quiz:", error)
        setIsLoading(false)
      }
    }

    initializeQuiz()
  }, [])

  const handleAnswerSelect = (selectedAnswer: string, isCorrect: boolean) => {
    setSelectedAnswer(selectedAnswer)

    const newAnswer: QuizAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer,
      isCorrect,
      answeredAt: new Date(),
    }

    setAnswers((prev) => [...prev, newAnswer])

    // Update streak
    if (isCorrect) {
      const newStreak = currentStreak + 1
      setCurrentStreak(newStreak)

      // Show streak celebration for milestones
      if (newStreak >= QUIZ_CONFIG.STREAK_CELEBRATION_THRESHOLD && newStreak % 3 === 0) {
        setShowStreakCelebration(true)
      }
    } else {
      setCurrentStreak(0)
    }

    // Show feedback
    setShowFeedback(true)

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setShowFeedback(false)
        setSelectedAnswer("")
      } else {
        setShowResults(true)
      }
    }, 2500)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowResults(false)
    setShowFeedback(false)
    setSelectedAnswer("")
    setCurrentStreak(0)
    setIsLoading(true)

    // Reinitialize with new random questions
    setTimeout(() => {
      const selectedQuestions = getRandomQuestions(SAMPLE_QUESTIONS, QUIZ_CONFIG.QUESTIONS_PER_SESSION)
      setQuestions(selectedQuestions)
      setIsLoading(false)
    }, 500)
  }

  const correctAnswers = answers.filter((answer) => answer.isCorrect).length

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <QuizCardSkeleton />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center p-8">
            <p className="text-slate-600 mb-4">No questions available at the moment.</p>
            <Button onClick={handleRestart} className="bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <QuizResults
        answers={answers}
        questions={questions}
        sessionId={`session-${Date.now()}`}
        onRestart={handleRestart}
        userId={userId}
      />
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
      />

      <QuizCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswerSelect={handleAnswerSelect}
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        isAnswered={!!selectedAnswer}
        currentStreak={currentStreak}
      />

      {/* Streak Celebration Modal */}
      {showStreakCelebration && (
        <StreakCelebration streak={currentStreak} onClose={() => setShowStreakCelebration(false)} />
      )}

      {/* Feedback Toast */}
      <FeedbackToast
        message={feedbackToast.message}
        type={feedbackToast.type}
        show={feedbackToast.show}
        onHide={() => setFeedbackToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  )
}
