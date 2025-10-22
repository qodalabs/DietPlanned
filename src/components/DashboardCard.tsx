"use client"
import { motion } from 'framer-motion'
import React from 'react'

export function DashboardCard({ title, value, hint, cta, href }: {
  title: string
  value: string
  hint?: string
  cta?: string
  href?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true, margin: '-40px' }}
      className="rounded-xl border border-gray-800 p-5 bg-ink-800/60 text-white backdrop-blur hover:ring-2 hover:ring-brand-500 transition-all"
    >
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-gray-400">{hint}</div>}
      {cta && href && (
        <a href={href} className="mt-4 inline-block text-sm text-brand-400 hover:underline">{cta}</a>
      )}
    </motion.div>
  )
}

export default DashboardCard
