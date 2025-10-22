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

export default function PlanActions() {
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
    </div>
  )
}
