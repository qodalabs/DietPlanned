"use client"
import React from 'react'
import { motion } from 'framer-motion'
import type { DietPlan } from '@/types/db'

export function DietPlanCard({ plan }: { plan: DietPlan }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: '0 10px 30px rgba(249,115,22,0.35)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      viewport={{ once: true, margin: '-40px' }}
      className="rounded-xl border border-gray-800 p-5 bg-ink-800/60 text-white backdrop-blur hover:ring-2 hover:ring-brand-500"
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
