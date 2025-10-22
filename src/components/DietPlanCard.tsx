"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import type { DietPlan } from '@/types/db'
import { useRouter } from 'next/navigation'

export function DietPlanCard({ plan }: { plan: DietPlan }) {
  const router = useRouter()
  const [busy, setBusy] = useState<null | 'regen' | 'delete'>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const ry = (x - 0.5) * 10 // left/right tilt
    const rx = -(y - 0.5) * 10 // up/down tilt
    rotateX.set(rx)
    rotateY.set(ry)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.025, boxShadow: '0 14px 36px rgba(249,115,22,0.4)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      viewport={{ once: true, margin: '-40px' }}
      className="rounded-xl border border-gray-800 p-5 bg-ink-800/60 text-white backdrop-blur hover:ring-2 hover:ring-brand-500 hover:shadow-glow-orange transition-all will-change-transform"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef as any}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{plan.title}</h3>
        <a href={`/dashboard/plan/${plan.id}`} className="text-sm text-brand-400 hover:underline">View</a>
      </div>
      <p className="mt-1 text-sm text-gray-300">{plan.summary}</p>
      <div className="mt-3 flex gap-3 text-xs text-gray-400">
        <span>Calories: {plan.meta?.calories ?? '—'}</span>
        <span>Protein: {plan.meta?.protein ?? '—'}g</span>
        <span>Carbs: {plan.meta?.carbs ?? '—'}g</span>
        <span>Fat: {plan.meta?.fat ?? '—'}g</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          aria-label="Regenerate plan"
          onClick={async () => {
            if (busy) return
            setBusy('regen')
            try {
              const res = await fetch(`/api/plan/${plan.id}/regenerate`, { method: 'POST' })
              const data = await res.json()
              if (!res.ok) throw new Error(data.message || 'Failed to regenerate')
              if (data.planId) window.location.href = `/dashboard/plan/${data.planId}`
            } catch (e: any) {
              alert(e.message || 'Could not regenerate plan')
            } finally {
              setBusy(null)
            }
          }}
          className={`px-3 py-1.5 rounded-md text-xs bg-brand-600 text-white hover:bg-brand-700 glow-orange transition-all active:scale-95 ${busy === 'regen' ? 'opacity-60 pointer-events-none' : ''}`}
        >
          {busy === 'regen' ? 'Regenerating…' : 'Regenerate'}
        </button>
        <button
          aria-label="Delete plan"
          onClick={async () => {
            if (busy) return
            if (!confirm('Delete this plan permanently?')) return
            setBusy('delete')
            try {
              const res = await fetch(`/api/plan/${plan.id}`, { method: 'DELETE' })
              const data = await res.json().catch(() => ({}))
              if (!res.ok) throw new Error(data.message || 'Failed to delete')
              router.refresh()
            } catch (e: any) {
              alert(e.message || 'Could not delete plan')
            } finally {
              setBusy(null)
            }
          }}
          className={`px-3 py-1.5 rounded-md text-xs border border-gray-700 text-gray-200 hover:text-red-400 hover:border-red-500 transition-all active:scale-95 ${busy === 'delete' ? 'opacity-60 pointer-events-none' : ''}`}
        >
          {busy === 'delete' ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </motion.article>
  )
}

export default DietPlanCard
