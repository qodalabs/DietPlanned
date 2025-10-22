import { Navbar } from '@/components/Navbar'
import DashboardCard from '@/components/DashboardCard'
import DietPlanCard from '@/components/DietPlanCard'
import { createDb } from '@/lib/db'
import { titleForDashboard, ctaGeneratePlan, ctaGetAssessed } from '@/lib/copy'
import { getSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = getSupabaseServer()
  const db = createDb(supabase)
  const { data: { user: authUser } } = await supabase.auth.getUser()
  const authed = !!authUser
  const user = authed ? await db.findUserById(authUser!.id) : null
  const latest = user ? await db.latestAssessmentForUser(user.id) : null
  const plans = user ? await db.findPlansByUser(user.id) : []

  return (
    <main>
      <Navbar authed={authed} />
      <div className="mx-auto max-w-6xl px-4 py-10 bg-ink-900 text-white">
        <h1 className="text-2xl font-semibold">{titleForDashboard(user?.name)}</h1>
        {!authed && (
          <p className="mt-2 text-sm text-gray-300">Please <a href="/login" className="text-brand-400 hover:underline">log in</a> to view your data.</p>
        )}
        {authed && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard title="Latest BMI" value={latest ? String(latest.bmi) : '—'} hint={latest ? latest.summary : 'Complete an assessment'} cta={ctaGetAssessed()} href="/dashboard/assessment" />
            <DashboardCard title="Recommended Calories" value={latest ? `${latest.recommendedCalories} kcal` : '—'} hint="Daily target" />
            <DashboardCard title="Active Plan" value={plans[0]?.title ?? 'No plan yet'} cta={ctaGeneratePlan()} href="/dashboard/assessment" />
          </div>
        )}
        {authed && plans.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Your Plans</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map(p => (
                <DietPlanCard key={p.id} plan={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
