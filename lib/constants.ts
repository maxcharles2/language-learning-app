export const QUIZ_CONFIG = {
  QUESTIONS_PER_SESSION: 10,
  STREAK_CELEBRATION_THRESHOLD: 3,
  PASSING_SCORE: 70,
} as const

export const FEEDBACK_MESSAGES = {
  CORRECT: [
    "✅ Correct! Well done!",
    "🎯 Perfect! You got it!",
    "👏 Excellent work!",
    "⭐ That's right! Great job!",
    "🌟 Fantastic! Keep going!",
  ],
  INCORRECT: [
    "💪 Don't worry, keep trying!",
    "📚 Learning opportunity! Try again!",
    "🎯 Close! You'll get the next one!",
    "💡 No problem, that's how we learn!",
    "🌱 Every mistake helps you grow!",
  ],
  STREAK: {
    3: "🔥 Great streak! You're doing amazing!",
    5: "🔥🔥 Incredible! Five in a row!",
    7: "🔥🔥🔥 Unstoppable! Seven correct!",
    10: "🔥🔥🔥🔥 LEGENDARY! Perfect streak!",
  },
} as const
