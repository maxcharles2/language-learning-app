import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface CategoryStat {
  category: string
  total: number
  correct: number
  accuracy: number
}

interface CategoryProgressProps {
  categoryStats: CategoryStat[]
  detailed?: boolean
}

export default function CategoryProgress({ categoryStats, detailed = false }: CategoryProgressProps) {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      greetings: "👋",
      numbers: "🔢",
      colors: "🎨",
      family: "👨‍👩‍👧‍👦",
      food: "🍎",
      animals: "🐱",
      body_parts: "👤",
      clothing: "👕",
    }
    return icons[category] || "📚"
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-emerald-600"
    if (accuracy >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getAccuracyBadgeColor = (accuracy: number) => {
    if (accuracy >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-200"
    if (accuracy >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (categoryStats.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="text-center p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Category Data Yet</h3>
          <p className="text-slate-600">Complete more quizzes to see your performance by category.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800">Category Performance</CardTitle>
        <p className="text-sm text-slate-600">Your accuracy across different vocabulary topics</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {categoryStats
          .sort((a, b) => b.accuracy - a.accuracy)
          .slice(0, detailed ? undefined : 6)
          .map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getCategoryIcon(category.category)}</span>
                  <div>
                    <p className="font-medium text-slate-800">{formatCategoryName(category.category)}</p>
                    <p className="text-xs text-slate-500">
                      {category.correct} of {category.total} correct
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${getAccuracyColor(category.accuracy)}`}>{category.accuracy}%</span>
                  {detailed && (
                    <Badge className={getAccuracyBadgeColor(category.accuracy)}>
                      {category.accuracy >= 80 ? "Strong" : category.accuracy >= 60 ? "Good" : "Needs Work"}
                    </Badge>
                  )}
                </div>
              </div>
              <Progress value={category.accuracy} className="h-2" />
            </div>
          ))}

        {!detailed && categoryStats.length > 6 && (
          <div className="text-center pt-2">
            <p className="text-sm text-slate-500">And {categoryStats.length - 6} more categories...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
