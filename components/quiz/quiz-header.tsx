import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuizHeaderProps {
  currentQuestion: number
  totalQuestions: number
  correctAnswers: number
}

export default function QuizHeader({ currentQuestion, totalQuestions, correctAnswers }: QuizHeaderProps) {
  const progress = (currentQuestion / totalQuestions) * 100
  const accuracy = currentQuestion > 1 ? (correctAnswers / (currentQuestion - 1)) * 100 : 0

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-700">French Quiz</h1>
            <p className="text-slate-600">
              Question {currentQuestion} of {totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Correct Answers</p>
            <p className="text-2xl font-bold text-emerald-600">{correctAnswers}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {currentQuestion > 1 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Current Accuracy: <span className="font-semibold text-emerald-600">{Math.round(accuracy)}%</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
