"use client"
import React, { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import type { DietPlan } from '@/types/db'

export function DietPlanCard({ plan }: { plan: DietPlan }) {
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
    </motion.article>
  )
}

export default DietPlanCard
