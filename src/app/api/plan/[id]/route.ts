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
    const ok = await db.deletePlanById(params.id, user.id)
    if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Delete error' }, { status: 400 })
  }
}

