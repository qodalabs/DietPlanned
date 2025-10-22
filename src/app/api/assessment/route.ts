import { NextRequest, NextResponse } from 'next/server'
import { createDb } from '@/lib/db'
import { bmi, bmr, recommendedCalories, humanizeAssessment } from '@/lib/assessment'
import { generatePlanFromAssessment } from '@/lib/gemini'
import { getSupabaseRoute } from '@/lib/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseRoute()
    const db = createDb(supabase)
    const { data: { user } } = await supabase.auth.getUser()
    const userId: string | null = user?.id || null

    const { age, sex, heightCm, weightKg, activity, goal } = await req.json()
    // Basic validation
    const a = Number(age), h = Number(heightCm), w = Number(weightKg)
    if (!['male','female'].includes(String(sex))) return NextResponse.json({ message: 'Invalid sex' }, { status: 400 })
    if (!a || !h || !w) return NextResponse.json({ message: 'Invalid numbers' }, { status: 400 })

    const bmiVal = bmi(h, w)
    const bmrVal = bmr(sex, h, w, a)
    const calories = recommendedCalories(sex, h, w, a, activity, goal)
    const summary = humanizeAssessment({ bmi: bmiVal, calories, goal })

    let assessmentRecord = null
    if (userId) {
      assessmentRecord = await db.createAssessment({
        userId,
        age: a,
        sex,
        heightCm: h,
        weightKg: w,
        activity,
        goal,
        bmi: bmiVal,
        bmr: bmrVal,
        recommendedCalories: calories,
        summary,
      })
    }

    // Stub Gemini plan generation via local generator
    const plan = userId && assessmentRecord ? await generatePlanFromAssessment(userId, assessmentRecord) : null
    const createdPlan = plan && userId ? await db.createPlan({
      userId,
      title: plan.title,
      summary: plan.summary,
      days: plan.days,
      meta: plan.meta,
    }) : null

    return NextResponse.json({
      bmi: bmiVal,
      bmr: bmrVal,
      recommendedCalories: calories,
      summary,
      assessmentId: assessmentRecord?.id,
      planId: createdPlan?.id,
    })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Assessment error' }, { status: 400 })
  }
}
