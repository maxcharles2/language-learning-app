import QuizContainer from "@/components/quiz/quiz-container"

export default async function QuizPage() {
  // Demo: Skip authentication check for now
  const demoUserId = "demo-user-123"

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <QuizContainer userId={demoUserId} />
    </div>
  )
}
