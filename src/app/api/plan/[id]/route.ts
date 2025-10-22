import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { createDb } from '@/lib/db'

export const runtime = 'nodejs'

type Params = { params: { id: string } }

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const supabase = getSupabaseRoute()
    const db = createDb(supabase)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    // First, verify the plan exists and belongs to the user
    const existing = await db.findPlanById(params.id)
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    // Attempt delete; if RLS permits, it succeeds. Treat no-error as success to avoid false 404s.
    await db.deletePlanById(params.id, user.id)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Delete error' }, { status: 400 })
  }
}
