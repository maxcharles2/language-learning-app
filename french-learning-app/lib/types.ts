export interface Question {
  id: string
  french_word: string
  english_translation: string
  options: string[]
  correct_answer: string
  difficulty_level: string
  category: string
  created_at: string
}

export interface QuizSession {
  id: string
  user_id: string
  started_at: string
  completed_at: string | null
  total_questions: number
  correct_answers: number
  score_percentage: number | null
  difficulty_level: string
  category: string | null
}

export interface UserProgress {
  id: string
  user_id: string
  question_id: string
  selected_answer: string
  is_correct: boolean
  answered_at: string
  session_id: string | null
}
