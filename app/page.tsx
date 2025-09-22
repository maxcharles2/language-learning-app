import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-slate-800">
            Learn French with <span className="text-emerald-600">FrenchQuest</span>
          </h1>
          <p className="text-xl text-slate-600">Master A1-level French vocabulary through interactive quizzes</p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/quiz">Start Quiz</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
