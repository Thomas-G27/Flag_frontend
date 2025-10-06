export interface Country {
  name: string
  code: string
  continent: string
  languages: string[]
  flagUrl: string
}

export interface QuizQuestion {
  country: Country
  userAnswer?: string
  isCorrect?: boolean
  skipped?: boolean
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  score: number
  timeSpent: number
  category: string
}