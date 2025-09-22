export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">FrenchQuest</h1>
        <p className="text-lg text-gray-600">Learn French A1 Level</p>
        <div className="space-y-2">
          <a href="/quiz" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Quiz
          </a>
        </div>
      </div>
    </div>
  )
}
