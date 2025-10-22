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
        <div className="mt-2 h-16 w-16 relative">
          {/* Outer spinner ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-500/30 border-t-brand-400 animate-spin glow-orange" />
          {/* Cooking pot with steam/flames (food being prepared) */}
          <svg viewBox="0 0 64 64" className="absolute inset-0 text-orange-400">
            {/* Lid (bobbing) */}
            <g className="animate-[bob_2s_ease-in-out_infinite]">
              <rect x="18" y="20" width="28" height="4" rx="2" fill="currentColor" opacity="0.9" />
              <circle cx="32" cy="18" r="2" fill="currentColor" />
            </g>
            {/* Steam (looping upward) */}
            <path d="M24 18 c-2 -4 2 -4 0 -8" className="fill-none" stroke="currentColor" strokeWidth="1.5" opacity="0.7"
              style={{ animation: 'steamUp 2.2s ease-in-out infinite', transformOrigin: '24px 18px' }} />
            <path d="M32 18 c-2 -4 2 -4 0 -8" className="fill-none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"
              style={{ animation: 'steamUp 2.0s ease-in-out infinite 0.3s', transformOrigin: '32px 18px' }} />
            <path d="M40 18 c-2 -4 2 -4 0 -8" className="fill-none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"
              style={{ animation: 'steamUp 2.4s ease-in-out infinite 0.6s', transformOrigin: '40px 18px' }} />
            {/* Pot body */}
            <rect x="16" y="26" width="32" height="16" rx="3" fill="#1b1b1f" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
            {/* Handles */}
            <rect x="12" y="30" width="4" height="8" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="48" y="30" width="4" height="8" rx="1" fill="currentColor" opacity="0.7" />
            {/* Bubbles rising inside the pot */}
            <circle cx="26" cy="38" r="1.4" fill="currentColor" opacity="0.85" style={{ animation: 'bubbleUp 1.8s ease-in-out infinite' }} />
            <circle cx="32" cy="40" r="1.2" fill="currentColor" opacity="0.7" style={{ animation: 'bubbleUp 2.1s ease-in-out infinite 0.3s' }} />
            <circle cx="38" cy="37" r="1.3" fill="currentColor" opacity="0.8" style={{ animation: 'bubbleUp 1.9s ease-in-out infinite 0.6s' }} />
            {/* Little flames flickering under pot */}
            <g opacity="0.9">
              <path d="M24 46 l4 6 l-4 0 z" fill="url(#flame)" className="origin-center animate-[flameFlicker_1.2s_ease-in-out_infinite]" />
              <path d="M32 46 l4 6 l-4 0 z" fill="url(#flame)" className="origin-center animate-[flameFlicker_1.3s_ease-in-out_infinite_0.2s]" />
              <path d="M40 46 l4 6 l-4 0 z" fill="url(#flame)" className="origin-center animate-[flameFlicker_1.1s_ease-in-out_infinite_0.4s]" />
            </g>
            <defs>
              <linearGradient id="flame" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        </div>
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
        @keyframes bob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-1.5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes steamUp {
          0% { opacity: 0; transform: translateY(6px) scale(0.9); }
          30% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-10px) scale(1.06); }
        }
        @keyframes bubbleUp {
          0% { transform: translateY(0px) scale(1); opacity: 0.2; }
          40% { opacity: 0.9; }
          100% { transform: translateY(-8px) scale(0.9); opacity: 0; }
        }
        @keyframes flameFlicker {
          0% { transform: scale(0.95); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}
