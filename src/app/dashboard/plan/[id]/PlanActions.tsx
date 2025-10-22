"use client"
import React, { useRef } from 'react'

function RippleButton({ onClick, children, className }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current
    if (btn) {
      const circle = document.createElement('span')
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      circle.className = 'ripple'
      circle.style.width = circle.style.height = `${size}px`
      circle.style.left = `${e.clientX - rect.left}px`
      circle.style.top = `${e.clientY - rect.top}px`
      btn.appendChild(circle)
      setTimeout(() => circle.remove(), 600)
    }
    onClick()
  }
  return (
    <button ref={ref} onClick={handleClick} className={`relative overflow-hidden active:scale-95 ${className || ''}`}>
      {children}
    </button>
  )
}

export default function PlanActions({ planId }: { planId: string }) {
  async function handleRegenerate() {
    try {
      const res = await fetch(`/api/plan/${planId}/regenerate`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to regenerate')
      if (data.planId) window.location.href = `/dashboard/plan/${data.planId}`
    } catch (e: any) {
      alert(e.message || 'Could not regenerate plan')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this plan permanently?')) return
    try {
      const res = await fetch(`/api/plan/${planId}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Failed to delete')
      window.location.href = '/dashboard'
    } catch (e: any) {
      alert(e.message || 'Could not delete plan')
    }
  }
  return (
    <div className="mt-8 flex gap-3 print:hidden">
      <RippleButton
        onClick={() => window.print()}
        className="px-4 py-2 rounded-md border border-gray-700 text-white hover:text-brand-400 hover:border-brand-500 transition-colors"
      >
        Print
      </RippleButton>
      <RippleButton
        onClick={() => (window.location.href = '/dashboard/assessment')}
        className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 glow-orange transition-colors"
      >
        Swap meals
      </RippleButton>
      <RippleButton
        onClick={handleRegenerate}
        className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
      >
        Regenerate
      </RippleButton>
      <RippleButton
        onClick={handleDelete}
        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        Delete
      </RippleButton>
    </div>
  )
}
