"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StreakCelebrationProps {
  streak: number
  onClose: () => void
}

export default function StreakCelebration({ streak, onClose }: StreakCelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="shadow-2xl border-0 bg-gradient-to-r from-orange-100 to-red-100 animate-bounce-in">
        <CardContent className="text-center p-8">
          <div className="text-6xl mb-4 animate-pulse">🔥</div>
          <h2 className="text-3xl font-bold text-orange-800 mb-2">Amazing Streak!</h2>
          <p className="text-xl text-orange-700 mb-4">{streak} correct answers in a row!</p>
          <p className="text-orange-600">You're on fire! Keep it up!</p>
        </CardContent>
      </Card>
    </div>
  )
}
