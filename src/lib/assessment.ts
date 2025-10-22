export type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
export type Goal = 'lose' | 'maintain' | 'gain'

export function bmi(heightCm: number, weightKg: number): number {
  const h = heightCm / 100
  return Number((weightKg / (h * h)).toFixed(1))
}

export function bmr(sex: 'male' | 'female', heightCm: number, weightKg: number, age: number): number {
  // Mifflin-St Jeor
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161)
  return Math.round(base)
}

export function activityFactor(a: Activity): number {
  return {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }[a]
}

export function recommendedCalories(sex: 'male' | 'female', heightCm: number, weightKg: number, age: number, activity: Activity, goal: Goal): number {
  const base = bmr(sex, heightCm, weightKg, age) * activityFactor(activity)
  const adj = goal === 'lose' ? -400 : goal === 'gain' ? 300 : 0
  return Math.max(1200, Math.round(base + adj))
}

export function humanizeAssessment({ bmi: bmiVal, calories, goal }: { bmi: number; calories: number; goal: Goal }): string {
  const bmiBand = bmiVal < 18.5 ? 'underweight' : bmiVal < 25 ? 'healthy' : bmiVal < 30 ? 'overweight' : 'obese'
  const goalText = goal === 'lose' ? 'fat loss' : goal === 'gain' ? 'lean muscle' : 'maintenance'
  return `Your BMI is ${bmiVal} (${bmiBand}). A daily target of ~${calories} kcal supports ${goalText}.`
}

