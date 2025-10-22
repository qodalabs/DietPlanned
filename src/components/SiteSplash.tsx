"use client"
import React from 'react'

export default function SiteSplash({ durationMs = 10000 }: { durationMs?: number }) {
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(false), Math.max(0, durationMs))
    return () => clearTimeout(t)
  }, [durationMs])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-900/95 backdrop-blur">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.08),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="text-3xl font-extrabold tracking-tight">
          <span className="text-white">Diet</span>
          <span className="text-brand-400">Planned</span>
        </div>
        <div className="text-sm text-gray-300">Preparing your personalized experience…</div>
        <div className="mt-2 h-14 w-14 rounded-full border-2 border-brand-500/40 border-t-brand-400 animate-spin glow-orange" />
        <div className="mt-6 h-1 w-48 overflow-hidden rounded bg-ink-800/80">
          <div className="h-full w-1/2 animate-[splashbar_1.6s_ease-in-out_infinite] bg-gradient-to-r from-brand-500 to-orange-400" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes splashbar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(30%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
    </div>
  )
}

