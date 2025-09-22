"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FeedbackToastProps {
  message: string
  type: "success" | "error"
  show: boolean
  onHide: () => void
}

export default function FeedbackToast({ message, type, show, onHide }: FeedbackToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-up">
      <Card
        className={`shadow-lg border-0 ${
          type === "success" ? "bg-emerald-100 border-emerald-200" : "bg-red-100 border-red-200"
        }`}
      >
        <CardContent className="p-4">
          <p className={`font-medium ${type === "success" ? "text-emerald-800" : "text-red-800"}`}>{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}
