import { Navbar } from '@/components/Navbar'
import { createDb } from '@/lib/db'
import { getSupabaseServer } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import PlanActions from './PlanActions'

export const dynamic = 'force-dynamic'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = getSupabaseServer()
  const db = createDb(supabase)
  const plan = await db.findPlanById(params.id)
  return {
    title: plan ? `${plan.title} — DietPlanned` : 'Diet Plan — DietPlanned',
    description: plan?.summary,
    openGraph: { title: plan?.title, description: plan?.summary },
  }
}

export default async function DietPlanPage({ params }: Props) {
  const supabase = getSupabaseServer()
  const db = createDb(supabase)
  const plan = await db.findPlanById(params.id)
  return (
    <main>
      <Navbar authed />
      <div className="mx-auto max-w-4xl px-4 py-10">
        {!plan && <div>Plan not found.</div>}
        {plan && (
          <article className="prose max-w-none">
            <h1 className="text-3xl font-bold tracking-tight">{plan.title}</h1>
            <p className="text-gray-600">{plan.summary}</p>
            <div className="mt-4 text-sm text-gray-600">
              <span className="mr-4">Calories: {plan.meta?.calories}</span>
              <span className="mr-4">Protein: {plan.meta?.protein}g</span>
              <span className="mr-4">Carbs: {plan.meta?.carbs}g</span>
              <span>Fat: {plan.meta?.fat}g</span>
            </div>
            <div className="mt-8 space-y-6 print:space-y-4">
              {plan.days.map(day => (
                <section key={day.day} className="rounded-xl border border-gray-200 p-4">
                  <h2 className="text-xl font-semibold">{day.day}</h2>
                  <ul className="mt-3 space-y-2">
                    {day.meals.map((m, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-medium">{m.time} — {m.name}</div>
                          {m.recipe && <div className="text-sm text-gray-600">{m.recipe}</div>}
                          {m.substitutions && m.substitutions.length > 0 && (
                            <div className="text-xs text-gray-500">Swaps: {m.substitutions.join(', ')}</div>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 sm:mt-0">{m.calories} kcal • P{m.protein} C{m.carbs} F{m.fat}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <PlanActions planId={params.id} />

            <script type="application/ld+json" suppressHydrationWarning>
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Diet',
                name: plan.title,
                description: plan.summary,
                hasMenu: plan.days.map(d => ({
                  '@type': 'Menu',
                  name: d.day,
                  hasMenuSection: d.meals.map(m => ({
                    '@type': 'MenuSection',
                    name: m.name,
                    nutrition: {
                      '@type': 'NutritionInformation',
                      calories: `${m.calories} calories`,
                      proteinContent: `${m.protein} g`,
                      carbohydrateContent: `${m.carbs} g`,
                      fatContent: `${m.fat} g`,
                    },
                  })),
                })),
              })}
            </script>
          </article>
        )}
      </div>
    </main>
  )
}
