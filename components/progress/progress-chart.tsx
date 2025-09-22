"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface WeeklyProgress {
  week: string
  quizzes: number
  accuracy: number
}

interface ProgressChartProps {
  weeklyProgress: WeeklyProgress[]
}

export default function ProgressChart({ weeklyProgress }: ProgressChartProps) {
  // Format data for display
  const chartData = weeklyProgress.map((week) => ({
    ...week,
    weekLabel: new Date(week.week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Accuracy Trend */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Accuracy Trend</CardTitle>
          <p className="text-sm text-slate-600">Your performance over the last 8 weeks</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="weekLabel" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, "Accuracy"]}
                  labelFormatter={(label) => `Week of ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#059669", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Activity */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Quiz Activity</CardTitle>
          <p className="text-sm text-slate-600">Number of quizzes completed per week</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="weekLabel" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number) => [value, "Quizzes"]}
                  labelFormatter={(label) => `Week of ${label}`}
                />
                <Bar dataKey="quizzes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
