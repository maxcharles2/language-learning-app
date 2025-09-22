import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuizCardSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-100">
          <Skeleton className="h-10 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-6 w-80 mx-auto mb-6" />

        <div className="grid gap-3">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
