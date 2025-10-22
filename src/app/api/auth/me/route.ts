import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { createDb } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_: NextRequest) {
  const supabase = getSupabaseRoute()
  const db = createDb(supabase)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ user: null })
  const profile = await db.findUserById(user.id)
  return NextResponse.json({ user: profile ?? { id: user.id, name: user.user_metadata?.name || user.email || 'User', email: user.email || '' } })
}
