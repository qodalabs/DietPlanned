import { NextRequest, NextResponse } from 'next/server'
import { generatePlanFromAssessment } from '@/lib/gemini'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    // Expected payload: { userId, assessment }
    const { userId, assessment } = await req.json()
    if (!userId || !assessment) return NextResponse.json({ message: 'Missing payload' }, { status: 400 })
    // In production, call Gemini API using process.env.GEMINI_API_KEY and stream/return structured plan.
    const plan = await generatePlanFromAssessment(String(userId), assessment)
    return NextResponse.json({ plan })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Gemini proxy error' }, { status: 400 })
  }
}

