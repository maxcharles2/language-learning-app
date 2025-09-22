import type { Question } from "@/lib/types"

export function getRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function getScoreGrade(score: number): {
  grade: string
  color: string
  message: string
} {
  if (score >= 90) {
    return {
      grade: "A+",
      color: "text-emerald-600",
      message: "Outstanding! You're mastering French vocabulary!",
    }
  } else if (score >= 80) {
    return {
      grade: "A",
      color: "text-emerald-600",
      message: "Excellent work! Keep up the great progress!",
    }
  } else if (score >= 70) {
    return {
      grade: "B",
      color: "text-blue-600",
      message: "Good job! You're making solid progress!",
    }
  } else if (score >= 60) {
    return {
      grade: "C",
      color: "text-yellow-600",
      message: "Not bad! Keep practicing to improve!",
    }
  } else {
    return {
      grade: "D",
      color: "text-red-600",
      message: "Keep trying! Practice makes perfect!",
    }
  }
}
