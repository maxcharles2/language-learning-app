import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-blue-600 mb-4">404</CardTitle>
          <CardDescription className="text-xl text-gray-600">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-500">{`Sorry, we couldn't find the page you're looking for.`}</p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/quiz">Start Quiz</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
