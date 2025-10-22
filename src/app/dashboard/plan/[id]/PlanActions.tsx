"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmDialog from '@/components/ConfirmDialog'

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
  const router = useRouter()
  const [busy, setBusy] = useState<'regen' | 'delete' | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  async function handleRegenerate() {
    if (busy) return
    setBusy('regen')
    try {
      const res = await fetch(`/api/plan/${planId}/regenerate`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to regenerate')
      if (data.planId) router.replace(`/dashboard/plan/${data.planId}`)
    } catch (e: any) {
      alert(e.message || 'Could not regenerate plan')
    } finally {
      setBusy(null)
    }
  }

  async function handleDelete() {
    if (busy) return
    setShowConfirm(true)
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
        className={`px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 glow-orange transition-all active:scale-95 ${busy === 'regen' ? 'opacity-60 pointer-events-none' : ''}`}
      >
        {busy === 'regen' ? 'Regenerating…' : 'Regenerate'}
      </RippleButton>
      <RippleButton
        onClick={handleDelete}
        className={`px-4 py-2 rounded-md border border-gray-700 text-gray-200 hover:text-red-400 hover:border-red-500 transition-all active:scale-95 ${busy === 'delete' ? 'opacity-60 pointer-events-none' : ''}`}
      >
        {busy === 'delete' ? 'Deleting…' : 'Delete'}
      </RippleButton>
      <ConfirmDialog
        open={showConfirm}
        title="Delete this plan?"
        message="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        busy={busy === 'delete'}
        onCancel={() => { if (busy !== 'delete') setShowConfirm(false) }}
        onConfirm={async () => {
          if (busy) return
          setBusy('delete')
          try {
            const res = await fetch(`/api/plan/${planId}`, { method: 'DELETE' })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.message || 'Failed to delete')
            setShowConfirm(false)
            router.replace('/dashboard')
          } catch (e: any) {
            alert(e.message || 'Could not delete plan')
          } finally {
            setBusy(null)
          }
        }}
      />
    </div>
  )
}
