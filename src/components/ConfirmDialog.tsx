"use client"
import React from 'react'

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  busy = false,
}: {
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  busy?: boolean
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={busy ? undefined : onCancel} />
      <div className="relative w-[90%] max-w-sm rounded-xl border border-gray-800 bg-ink-900 text-white shadow-glow-orange p-5 animate-in fade-in zoom-in duration-150">
        <h3 className="text-lg font-semibold">{title}</h3>
        {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={busy ? undefined : onCancel}
            className={`px-4 py-2 rounded-md border border-gray-700 text-gray-200 hover:text-brand-400 hover:border-brand-500 transition-all active:scale-95 ${busy ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {cancelText}
          </button>
          <button
            onClick={busy ? undefined : onConfirm}
            className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 ${busy ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {busy ? 'Working…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

