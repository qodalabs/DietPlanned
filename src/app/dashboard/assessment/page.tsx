import { Navbar } from '@/components/Navbar'
import AssessmentClient from './AssessmentClient'
import { getSupabaseServer } from '@/lib/supabase-server'

export default async function AssessmentPage() {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  const authed = !!user

  return (
    <main>
      <Navbar authed={authed} />
      <div className="mx-auto max-w-2xl px-4 py-10 bg-ink-900 text-white">
        <h1 className="text-2xl font-semibold">Your quick assessment</h1>
        {!authed && (
          <p className="mt-2 text-sm text-gray-300">Please <a href="/login" className="text-brand-400 hover:underline">log in</a> to save your results.</p>
        )}
        <div className="mt-6">
          <AssessmentClient />
        </div>
      </div>
    </main>
  )
}
