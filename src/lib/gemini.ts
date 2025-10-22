import type { Assessment, DietPlan } from '@/types/db'

// Real Gemini integration with graceful fallback to the existing stub.
// To enable: set GEMINI_API_KEY in your environment (and optionally GEMINI_MODEL).
// No client bundle exposure: only used in server routes.

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
const API_VERSIONS = ['v1', 'v1beta']

function modelCandidates(base: string): string[] {
  const set = new Set<string>()
  set.add(base)
  if (!base.endsWith('-latest')) set.add(`${base}-latest`)
  if (base.endsWith('-latest')) set.add(base.replace(/-latest$/, ''))
  // Common fallbacks
  // 2.x family
  set.add('gemini-2.5-flash')
  set.add('gemini-2.5-flash-latest')
  set.add('gemini-2.0-flash')
  set.add('gemini-2.0-flash-latest')
  set.add('gemini-2.0-flash-lite')
  set.add('gemini-2.0-flash-lite-latest')
  set.add('gemini-2.0-pro')
  set.add('gemini-2.0-pro-latest')
  // 1.x family
  set.add('gemini-1.5-flash')
  set.add('gemini-1.5-flash-latest')
  set.add('gemini-1.5-pro')
  set.add('gemini-1.5-pro-latest')
  set.add('gemini-1.0-pro')
  return Array.from(set)
}

async function callGeminiJSON(model: string, apiKey: string, prompt: string): Promise<any> {
  let lastErr: unknown
  for (const ver of API_VERSIONS) {
    for (const m of modelCandidates(model)) {
      const url = `https://generativelanguage.googleapis.com/${ver}/models/${m}:generateContent?key=${apiKey}`
      const body = {
        contents: [{ parts: [{ text: prompt }]}],
        generationConfig: {
          temperature: 0.7,
          // Avoid response_mime_type for v1; enforce JSON via prompt
        },
      }
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`Gemini API error ${res.status} (${ver}/${m}): ${text}`)
        }
        const data = await res.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const jsonStr = text.trim().replace(/^```json\n?|```$/g, '')
        console.info(`[Gemini] Success via ${ver}/${m}`)
        return JSON.parse(jsonStr)
      } catch (e) {
        lastErr = e
        const msg = e instanceof Error ? e.message : String(e)
        // 404/405 -> try next candidate; others might still be transient but we iterate
        console.warn(`[Gemini] Attempt failed ${ver}/${m}: ${msg}`)
        continue
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr))
}

function stubPlan(userId: string, assessment: Assessment): DietPlan {
  const baseCalories = assessment.recommendedCalories
  return {
    id: 'temp',
    userId,
    title: 'Smart 7-Day Plan',
    summary: `A balanced plan around ${baseCalories} kcal/day to support your goal.`,
    meta: {
      calories: baseCalories,
      protein: Math.round((baseCalories * 0.3) / 4),
      carbs: Math.round((baseCalories * 0.4) / 4),
      fat: Math.round((baseCalories * 0.3) / 9),
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
}

export async function generatePlanFromAssessment(userId: string, assessment: Assessment): Promise<DietPlan> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.info('[Gemini] No GEMINI_API_KEY found. Using stub plan.')
    // Keep existing behavior if no key configured
    return stubPlan(userId, assessment)
  }

  const macros = {
    calories: assessment.recommendedCalories,
    protein: Math.round((assessment.recommendedCalories * 0.3) / 4),
    carbs: Math.round((assessment.recommendedCalories * 0.4) / 4),
    fat: Math.round((assessment.recommendedCalories * 0.3) / 9),
  }

  const system = `You are a certified nutritionist creating a practical, approachable 7-day meal plan.
Return ONLY a JSON object with the following TypeScript shape (no extra text):
{
  "title": string,
  "summary": string,
  "meta": { "calories": number, "protein": number, "carbs": number, "fat": number },
  "days": [
    { "day": string, "meals": [
      { "name": string, "time": "HH:mm", "calories": number, "protein": number, "carbs": number, "fat": number, "recipe"?: string, "substitutions"?: string[] }
    ]}
  ]
}

Strict requirements:
- Provide exactly 7 days.
- Sum of meal calories per day should be within ±10% of ${macros.calories}.
- Use simple, globally available foods. Include reasonable vegetarian swaps when helpful.
- Times in 24h format HH:mm.
- Keep names succinct; add optional "recipe" for one meal/day.
`

  const input = {
    user: userId,
    profile: {
      age: assessment.age,
      sex: assessment.sex,
      heightCm: assessment.heightCm,
      weightKg: assessment.weightKg,
      activity: assessment.activity,
      goal: assessment.goal,
      bmi: assessment.bmi,
      bmr: assessment.bmr,
    },
    targets: macros,
    guidance: assessment.summary,
  }

  const prompt = `${system}\n\nUser profile and targets:\n${JSON.stringify(input, null, 2)}`

  try {
    console.info(`[Gemini] Calling model="${DEFAULT_MODEL}" for user=${userId}.`)
    const json = await callGeminiJSON(DEFAULT_MODEL, apiKey, prompt)
    const plan: DietPlan = {
      id: 'temp',
      userId,
      title: String(json.title || 'Personalized 7-Day Plan'),
      summary: String(json.summary || `A balanced plan around ${macros.calories} kcal/day.`),
      meta: {
        calories: Number(json.meta?.calories ?? macros.calories),
        protein: Number(json.meta?.protein ?? macros.protein),
        carbs: Number(json.meta?.carbs ?? macros.carbs),
        fat: Number(json.meta?.fat ?? macros.fat),
      },
      days: Array.isArray(json.days) ? json.days.map((d: any, idx: number) => ({
        day: String(d?.day || `Day ${idx + 1}`),
        meals: Array.isArray(d?.meals) ? d.meals.map((m: any) => ({
          name: String(m?.name || 'Meal'),
          time: String(m?.time || '12:00'),
          calories: Number(m?.calories || 0),
          protein: Number(m?.protein || 0),
          carbs: Number(m?.carbs || 0),
          fat: Number(m?.fat || 0),
          recipe: m?.recipe ? String(m.recipe) : undefined,
          substitutions: Array.isArray(m?.substitutions) ? m.substitutions.map((s: any) => String(s)) : undefined,
        })) : [],
      })) : [],
      createdAt: new Date().toISOString(),
    }

    // Ensure exactly 7 days; if not, fall back to stub
    if (!plan.days || plan.days.length !== 7) {
      console.warn('[Gemini] Invalid days count in response. Falling back to stub.')
      return stubPlan(userId, assessment)
    }
    return plan
  } catch (err) {
    console.warn('[Gemini] Error during API call. Falling back to stub.', err)
    // Fallback to stubbed plan on any error to avoid breaking flows/tests
    return stubPlan(userId, assessment)
  }
}
