import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProgressData {
  totalQuizzes: number
  totalQuestions: number
  correctAnswers: number
  averageScore: number
  bestScore: number
  currentStreak: number
  longestStreak: number
}

interface ProgressStatsProps {
  progressData: ProgressData
}

export default function ProgressStats({ progressData }: ProgressStatsProps) {
  const overallAccuracy =
    progressData.totalQuestions > 0 ? Math.round((progressData.correctAnswers / progressData.totalQuestions) * 100) : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 90) return { text: "Expert", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
    if (accuracy >= 80) return { text: "Advanced", color: "bg-blue-100 text-blue-800 border-blue-200" }
    if (accuracy >= 70) return { text: "Intermediate", color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    if (accuracy >= 60) return { text: "Beginner", color: "bg-orange-100 text-orange-800 border-orange-200" }
    return { text: "Learning", color: "bg-slate-100 text-slate-800 border-slate-200" }
  }

  const accuracyBadge = getAccuracyBadge(overallAccuracy)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Quizzes */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600">Quizzes Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-800">{progressData.totalQuizzes}</span>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Accuracy */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600">Overall Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getScoreColor(overallAccuracy)}`}>{overallAccuracy}%</span>
              <Badge className={accuracyBadge.color}>{accuracyBadge.text}</Badge>
            </div>
            <Progress value={overallAccuracy} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Best Score */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600">Best Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(progressData.bestScore)}`}>
              {progressData.bestScore}%
            </span>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l7 7 7-7M5 21l7-7 7 7" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">{progressData.currentStreak}</span>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm">🔥</span>
            </div>
          </div>
          {progressData.longestStreak > progressData.currentStreak && (
            <p className="text-xs text-slate-500 mt-1">Best: {progressData.longestStreak}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
