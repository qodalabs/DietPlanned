export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface Assessment {
  id: string
  userId: string
  age: number
  sex: 'male' | 'female'
  heightCm: number
  weightKg: number
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lose' | 'maintain' | 'gain'
  bmi: number
  bmr: number
  recommendedCalories: number
  summary: string
  createdAt: string
}

export interface DietPlanMeal {
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  recipe?: string
  substitutions?: string[]
}

export interface DietPlanDay {
  day: string
  meals: DietPlanMeal[]
}

export interface DietPlanMeta {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface DietPlan {
  id: string
  userId: string
  title: string
  summary: string
  days: DietPlanDay[]
  meta?: DietPlanMeta
  createdAt: string
}
