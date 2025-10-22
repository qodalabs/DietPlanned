import { cookies } from 'next/headers'
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export function getSupabaseServer() {
  // For Server Components (App Router)
  return createServerComponentClient({ cookies })
}

export function getSupabaseRoute() {
  // For Route Handlers (app/api/*)
  return createRouteHandlerClient({ cookies })
}
