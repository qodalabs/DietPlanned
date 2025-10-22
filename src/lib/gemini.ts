import type { Assessment, DietPlan } from '@/types/db'

// Placeholder Gemini proxy function. In production, use Google Generative AI SDK
// and the API key from process.env.GEMINI_API_KEY to generate a structured plan.

export async function generatePlanFromAssessment(userId: string, assessment: Assessment): Promise<DietPlan> {
  // This is a stubbed plan to demonstrate structure. Replace with real LLM call.
  const baseCalories = assessment.recommendedCalories
  const plan: DietPlan = {
    id: 'temp',
    userId,
    title: 'Smart 7-Day Plan',
    summary: `A balanced plan around ${baseCalories} kcal/day to support your goal.`,
    meta: {
      calories: baseCalories,
      protein: Math.round(baseCalories * 0.3 / 4),
      carbs: Math.round(baseCalories * 0.4 / 4),
      fat: Math.round(baseCalories * 0.3 / 9),
    },
    days: Array.from({ length: 7 }).map((_, i) => ({
      day: `Day ${i + 1}`,
      meals: [
        { name: 'Greek Yogurt + Berries', time: '08:00', calories: 350, protein: 25, carbs: 40, fat: 10, substitutions: ['Overnight oats', 'Tofu scramble'] },
        { name: 'Chicken Salad Wrap', time: '12:30', calories: 550, protein: 40, carbs: 50, fat: 18, substitutions: ['Tuna wrap', 'Chickpea salad'] },
        { name: 'Salmon + Quinoa + Greens', time: '19:00', calories: 650, protein: 45, carbs: 55, fat: 20, substitutions: ['Tofu + rice', 'Chicken + potatoes'] },
        { name: 'Protein Shake', time: '16:00', calories: 200, protein: 25, carbs: 10, fat: 3 },
      ],
    })),
    createdAt: new Date().toISOString(),
  }
  return plan
}

