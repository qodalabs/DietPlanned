import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase-server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  try {
    const { name } = await req.json()
    const email = user.email || ''
    const profile = await db.upsertProfile({ id: user.id, email, name })
    return NextResponse.json({ profile })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Profile upsert error' }, { status: 400 })
  }
}

