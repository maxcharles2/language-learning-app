"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProgressChart from "./progress-chart"
import CategoryProgress from "./category-progress"
import RecentSessions from "./recent-sessions"
import ProgressStats from "./progress-stats"
import Link from "next/link"

interface ProgressData {
  totalQuizzes: number
  totalQuestions: number
  correctAnswers: number
  averageScore: number
  bestScore: number
  currentStreak: number
  longestStreak: number
  categoryStats: CategoryStat[]
  recentSessions: QuizSession[]
  weeklyProgress: WeeklyProgress[]
}

interface CategoryStat {
  category: string
  total: number
  correct: number
  accuracy: number
}

interface QuizSession {
  id: string
  started_at: string
  completed_at: string
  total_questions: number
  correct_answers: number
  score_percentage: number
}

interface WeeklyProgress {
  week: string
  quizzes: number
  accuracy: number
}

interface ProgressDashboardProps {
  userId: string
}

export default function ProgressDashboard({ userId }: ProgressDashboardProps) {
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch quiz sessions
      const { data: sessions, error: sessionsError } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("user_id", userId)
        .not("completed_at", "is", null)
        .order("completed_at", { ascending: false })

      if (sessionsError) throw sessionsError

      // Fetch user progress for category analysis
      const { data: userProgress, error: progressError } = await supabase
        .from("user_progress")
        .select(`
          *,
          questions (
            category,
            correct_answer
          )
        `)
        .eq("user_id", userId)

      if (progressError) throw progressError

      // Calculate statistics
      const totalQuizzes = sessions?.length || 0
      const totalQuestions = sessions?.reduce((sum, session) => sum + session.total_questions, 0) || 0
      const correctAnswers = sessions?.reduce((sum, session) => sum + session.correct_answers, 0) || 0
      const averageScore =
        totalQuizzes > 0 ? sessions.reduce((sum, session) => sum + session.score_percentage, 0) / totalQuizzes : 0
      const bestScore = totalQuizzes > 0 ? Math.max(...sessions.map((s) => s.score_percentage)) : 0

      // Calculate category statistics
      const categoryStats = calculateCategoryStats(userProgress || [])

      // Calculate weekly progress
      const weeklyProgress = calculateWeeklyProgress(sessions || [])

      // Calculate streaks (simplified - would need more complex logic for actual streaks)
      const currentStreak = calculateCurrentStreak(sessions || [])
      const longestStreak = calculateLongestStreak(sessions || [])

      setProgressData({
        totalQuizzes,
        totalQuestions,
        correctAnswers,
        averageScore: Math.round(averageScore),
        bestScore: Math.round(bestScore),
        currentStreak,
        longestStreak,
        categoryStats,
        recentSessions: sessions?.slice(0, 5) || [],
        weeklyProgress,
      })
    } catch (err) {
      console.error("Error fetching progress data:", err)
      setError(err instanceof Error ? err.message : "Failed to load progress data")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateCategoryStats = (userProgress: any[]): CategoryStat[] => {
    const categoryMap = new Map<string, { total: number; correct: number }>()

    userProgress.forEach((progress) => {
      const category = progress.questions?.category || "unknown"
      const current = categoryMap.get(category) || { total: 0, correct: 0 }
      categoryMap.set(category, {
        total: current.total + 1,
        correct: current.correct + (progress.is_correct ? 1 : 0),
      })
    })

    return Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      total: stats.total,
      correct: stats.correct,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))
  }

  const calculateWeeklyProgress = (sessions: QuizSession[]): WeeklyProgress[] => {
    const weekMap = new Map<string, { quizzes: number; totalScore: number }>()

    sessions.forEach((session) => {
      const date = new Date(session.completed_at)
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()))
      const weekKey = weekStart.toISOString().split("T")[0]

      const current = weekMap.get(weekKey) || { quizzes: 0, totalScore: 0 }
      weekMap.set(weekKey, {
        quizzes: current.quizzes + 1,
        totalScore: current.totalScore + session.score_percentage,
      })
    })

    return Array.from(weekMap.entries())
      .map(([week, stats]) => ({
        week,
        quizzes: stats.quizzes,
        accuracy: Math.round(stats.totalScore / stats.quizzes),
      }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-8) // Last 8 weeks
  }

  const calculateCurrentStreak = (sessions: QuizSession[]): number => {
    let streak = 0
    for (const session of sessions) {
      if (session.score_percentage >= 70) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const calculateLongestStreak = (sessions: QuizSession[]): number => {
    let maxStreak = 0
    let currentStreak = 0

    sessions.reverse().forEach((session) => {
      if (session.score_percentage >= 70) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    })

    return maxStreak
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Progress</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button onClick={fetchProgressData} className="bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!progressData || progressData.totalQuizzes === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Start Your Learning Journey</h2>
            <p className="text-slate-600 mb-6">Take your first quiz to see your progress here!</p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/quiz">Take Your First Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-emerald-700">Your Progress</h1>
        <p className="text-slate-600">Track your French learning journey</p>
      </div>

      {/* Quick Stats */}
      <ProgressStats progressData={progressData} />

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <CategoryProgress categoryStats={progressData.categoryStats} />
            <RecentSessions sessions={progressData.recentSessions} />
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <CategoryProgress categoryStats={progressData.categoryStats} detailed />
        </TabsContent>

        <TabsContent value="sessions">
          <RecentSessions sessions={progressData.recentSessions} detailed />
        </TabsContent>

        <TabsContent value="charts">
          <ProgressChart weeklyProgress={progressData.weeklyProgress} />
        </TabsContent>
      </Tabs>

      {/* Action Button */}
      <div className="text-center">
        <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/quiz">Continue Learning</Link>
        </Button>
      </div>
    </div>
  )
}
