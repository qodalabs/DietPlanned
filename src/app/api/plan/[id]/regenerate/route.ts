import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { createDb } from '@/lib/db'
import { generatePlanFromAssessment } from '@/lib/gemini'

export const runtime = 'nodejs'

type Params = { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
  try {
    const supabase = getSupabaseRoute()
    const db = createDb(supabase)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    // Ensure plan belongs to user (existence check)
    const existing = await db.findPlanById(params.id)
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    // Use latest assessment for this user
    const latest = await db.latestAssessmentForUser(user.id)
    if (!latest) return NextResponse.json({ message: 'No assessment found' }, { status: 400 })

    const generated = await generatePlanFromAssessment(user.id, latest)
    const created = await db.createPlan({
      userId: user.id,
      title: generated.title,
      summary: generated.summary,
      days: generated.days,
      meta: generated.meta,
    })

    return NextResponse.json({ planId: created.id })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Regenerate error' }, { status: 400 })
  }
}

